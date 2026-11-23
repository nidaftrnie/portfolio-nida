import { Fragment } from "react";

/** Judul yang dipecah per huruf agar bisa dianimasikan (lihat lib/motion.js). */
export default function SplitHeading({ text, as: Tag = "h2" }) {
  const words = text.split(" ");
  return (
    <Tag className="split" aria-label={text}>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="w" aria-hidden="true">
            {[...w].map((c, ci) => (
              <span className="ch" key={ci}>
                {c}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
