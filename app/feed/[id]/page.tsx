import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { theme } from "@/components/Styles";
import Link from "next/link";

interface NewsItem {
  author?: string;
  img?: string;
  cat?: string;
  title?: string;
  newsUpdate?: string;
  timestamp?: string;
}

// Next.js dynamic route params type wrapper
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleFeedPage({ params }: PageProps) {
  // Await the dynamic parameters provided by Next.js
  const { id } = await params;

  let post: NewsItem | null = null;

  try {
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      post = docSnap.data() as NewsItem;
    }
  } catch (error) {
    console.error("Error fetching single post document:", error);
  }

  // Fallback view if the post doesn't exist
  if (!post) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Update Not Found</h2>
        <p className="text-slate-500 mb-4">The update you are looking for might have been deleted.</p>
        <Link href="/" className="text-sm font-semibold underline" style={{ color: theme.primaryColor }}>
          Go back to Feed
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans">
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Back Navigation Bar */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold mb-6 hover:opacity-80 transition-opacity"
          style={{ color: theme.primaryColor }}
        >
          ← Back to Feed
        </Link>

        <article className="border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 space-y-6">
          
          {/* Header Metadata section */}
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              {post.img ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-100 bg-slate-100">
                  <img
                    src={post.img}
                    alt={post.author || "Author"}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base text-white shadow-inner"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {post.author ? post.author.charAt(0) : "?"}
                </div>
              )}

              <div>
                <h3 className="text-base font-bold text-slate-800 leading-tight">
                  {post.author || "Anonymous Contributor"}
                </h3>
                <span className="text-xs text-slate-400">
                  {post.timestamp || "Unknown time"}
                </span>
              </div>
            </div>

            <span
              className="text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-md bg-opacity-10"
              style={{
                color: theme.secondaryColor,
                backgroundColor: `${theme.secondaryColor}15`,
              }}
            >
              {post.cat || "General"}
            </span>
          </div>

          {/* Headline & Body Text Area */}
          <div className="space-y-4">
            <h1
              className="text-2xl md:text-3xl font-extrabold tracking-tight leading-snug"
              style={{ color: theme.primaryColor }}
            >
              {post.title}
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {post.newsUpdate}
            </p>
          </div>

          {/* Verification Badge Footer */}
          <div className="pt-4 border-t border-slate-50">
            <span className="text-xs font-medium text-slate-400">
              CampusLink Verified Official Update • ID: {id}
            </span>
          </div>

        </article>
      </div>
    </main>
  );
}