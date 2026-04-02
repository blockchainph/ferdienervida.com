import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  serverTimestamp,
  where
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9v3ZoT0v8s_uRf9Ux_UpjB0WxR-0CLzw",
  authDomain: "bpap-comments.firebaseapp.com",
  projectId: "bpap-comments",
  storageBucket: "bpap-comments.firebasestorage.app",
  messagingSenderId: "232092127412",
  appId: "1:232092127412:web:fede8514366cbaf7bac7e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const articleCard = document.querySelector(".article-page-card");
const postContent = articleCard?.querySelector(".post-content");
const postTitle = articleCard?.querySelector(".post-title")?.textContent?.trim() || "Article";

if (!articleCard || !postContent) {
  // Nothing to do outside article pages.
} else {
  const slugMatch = window.location.pathname.match(/\/blog\/articles\/([^/]+)\/?$/);
  const articleSlug = slugMatch?.[1];

  if (articleSlug) {
    const likedStorageKey = `ferdie-blog-liked:${articleSlug}`;
    const dateFormatter = new Intl.DateTimeFormat("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const section = document.createElement("section");
    section.className = "reader-engagement";
    section.innerHTML = `
      <div class="engagement-bar">
        <div class="engagement-meta">
          <span class="like-count-chip" data-like-count>0 likes</span>
          <span data-comment-count>0 comments</span>
        </div>
        <div class="engagement-actions">
          <button class="like-button" type="button" data-like-button>Like this piece</button>
        </div>
      </div>
      <div class="comments-panel" id="comments">
        <h4 class="article-comments-title">Comments</h4>
        <p class="comment-note">Responses are public. Email stays private and is used only if moderation is needed.</p>
        <div class="comments-list" data-comments-list></div>
        <p class="comment-empty" data-comment-empty>No comments yet.</p>
        <form class="comment-form" data-comment-form>
          <div class="comment-form-grid">
            <div class="comment-field">
              <label for="comment-name">Name</label>
              <input id="comment-name" name="name" type="text" required>
            </div>
            <div class="comment-field">
              <label for="comment-email">Email</label>
              <input id="comment-email" name="email" type="email" required>
            </div>
          </div>
          <div class="comment-field">
            <label for="comment-body">Comment</label>
            <textarea id="comment-body" name="comment_body" required></textarea>
          </div>
          <button class="comment-submit" type="submit">Post comment</button>
          <p class="comment-status" data-comment-status aria-live="polite"></p>
        </form>
      </div>
    `;

    articleCard.appendChild(section);

    const likeCountNode = section.querySelector("[data-like-count]");
    const likeButton = section.querySelector("[data-like-button]");
    const commentsList = section.querySelector("[data-comments-list]");
    const commentEmpty = section.querySelector("[data-comment-empty]");
    const commentCountNode = section.querySelector("[data-comment-count]");
    const form = section.querySelector("[data-comment-form]");
    const statusNode = section.querySelector("[data-comment-status]");

    const likeDocRef = doc(db, "blogLikes", articleSlug);

    function escapeHtml(value) {
      return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
    }

    function setStatus(message, isError = false) {
      if (!statusNode) {
        return;
      }

      statusNode.textContent = message;
      statusNode.classList.toggle("is-error", isError);
    }

    function updateCommentCount(count) {
      if (!commentCountNode) {
        return;
      }

      commentCountNode.textContent = `${count} comment${count === 1 ? "" : "s"}`;
    }

    function updateLikeCount(count) {
      if (!likeCountNode) {
        return;
      }

      likeCountNode.textContent = `${count} like${count === 1 ? "" : "s"}`;
    }

    function renderComment(comment) {
      const createdAt = comment.createdAt?.toDate ? comment.createdAt.toDate() : new Date();

      return `
        <article class="comment-card">
          <div class="comment-head">
            <strong class="comment-author">${escapeHtml(comment.name)}</strong>
            <time class="comment-time">${dateFormatter.format(createdAt)}</time>
          </div>
          <p class="comment-body">${escapeHtml(comment.commentBody)}</p>
        </article>
      `;
    }

    function syncLikedState() {
      const isLiked = localStorage.getItem(likedStorageKey) === "true";
      if (!likeButton) {
        return;
      }

      likeButton.disabled = isLiked;
      likeButton.classList.toggle("is-liked", isLiked);
      likeButton.textContent = isLiked ? "Liked" : "Like this piece";
    }

    async function loadLikes() {
      const snapshot = await getDoc(likeDocRef);
      const count = snapshot.exists() ? Number(snapshot.data().count || 0) : 0;
      updateLikeCount(count);
      syncLikedState();
    }

    async function loadComments() {
      const commentsQuery = query(
        collection(db, "blogComments"),
        where("articleSlug", "==", articleSlug),
        where("isHidden", "==", false)
      );

      const snapshot = await getDocs(commentsQuery);
      const comments = snapshot.docs
        .map((entry) => ({ id: entry.id, ...entry.data() }))
        .sort((a, b) => {
          const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return timeA - timeB;
        });

      updateCommentCount(comments.length);

      if (!comments.length) {
        commentsList.innerHTML = "";
        commentEmpty.hidden = false;
        return;
      }

      commentEmpty.hidden = true;
      commentsList.innerHTML = comments.map(renderComment).join("");
    }

    likeButton?.addEventListener("click", async () => {
      if (localStorage.getItem(likedStorageKey) === "true") {
        syncLikedState();
        return;
      }

      likeButton.disabled = true;
      likeButton.textContent = "Liking...";

      try {
        const nextCount = await runTransaction(db, async (transaction) => {
          const snapshot = await transaction.get(likeDocRef);
          const currentCount = snapshot.exists() ? Number(snapshot.data().count || 0) : 0;
          const updatedCount = currentCount + 1;

          transaction.set(
            likeDocRef,
            {
              articleSlug,
              title: postTitle,
              count: updatedCount,
              updatedAt: serverTimestamp()
            },
            { merge: true }
          );

          return updatedCount;
        });

        localStorage.setItem(likedStorageKey, "true");
        updateLikeCount(nextCount);
      } catch (error) {
        console.error(error);
      } finally {
        syncLikedState();
      }
    });

    form?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = (formData.get("name") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const commentBody = (formData.get("comment_body") || "").toString().trim();

      if (!name || !email || !commentBody) {
        setStatus("Please complete your name, email, and comment.", true);
        return;
      }

      if (/(https?:\/\/|www\.)/i.test(commentBody)) {
        setStatus("Links are disabled in comments for now.", true);
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Posting...";
      }

      setStatus("Posting your comment...");

      try {
        await addDoc(collection(db, "blogComments"), {
          articleSlug,
          title: postTitle,
          name,
          email,
          commentBody,
          isHidden: false,
          createdAt: serverTimestamp()
        });

        form.reset();
        setStatus("Your comment is live.");
        await loadComments();
      } catch (error) {
        console.error(error);
        setStatus("Your comment could not be posted right now.", true);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Post comment";
        }
      }
    });

    Promise.all([loadLikes(), loadComments()]).catch((error) => {
      console.error(error);
      setStatus("Comments are unavailable right now.", true);
    });
  }
}
