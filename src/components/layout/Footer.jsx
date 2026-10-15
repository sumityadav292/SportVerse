import { Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-display">
          <Radio className="h-4 w-4 text-live" />
          SportVerse
        </div>
        <p style={{ fontWeight: "normal", fontSize: "8px" }}>
          Website Designed, Developed & Managed by: <a 
            href="https://sumityadavportfolio1.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
>
  <span style={{ fontWeight: "bolder", fontSize: "15px", color: "lightgreen" }}>
    SuϻɪƬ Yᴀᴅᴀꪜ
  </span>
</a>

        </p>
      </div>
    </footer>
  );
}
