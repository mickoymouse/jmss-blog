import { h } from "vue";
import type { PortableTextComponents } from "@portabletext/vue";
import Prism from "prismjs";

import ImageRenderer from "@/components/renderers/Image.vue";
import Callout from "@/components/renderers/Callout.vue";

// this is because somehow when you do enter on sanity for a new line, it returns it as an empty block
// so we would convert that into a <br> tag instead of a <p></p>
const convertEmptyContentToBr =
  (tag: string, className?: string) =>
  (_: any, { slots }: any) => {
    const children = slots.default ? slots.default() : [];
    const finalTag = children.length === 1 && children[0]?.children === "" ? "br" : tag;
    return h(
      finalTag,
      className && finalTag !== "br" ? { class: className } : {},
      finalTag === "br" ? null : children
    );
  };

const codeBlockRenderer = (props: any) => {
  const { language, code } = props.value;
  const grammar =
    Prism.languages[language] ||
    Prism.languages.plaintext ||
    Prism.languages.markup ||
    Prism.languages.javascript;
  const highlighted = Prism.highlight(code, grammar!, language);

  return h(
    "pre",
    { class: "overflow-x-auto bg-(--neutral-200) font-(--font-fira-code) p-4 rounded" },
    [h("code", { class: `language-${language}`, innerHTML: highlighted })]
  );
};

const calloutRenderer = (props: any) => {
  const { title, text, type } = props.value;

  return h(Callout, { title, text, type });
};

export const components: PortableTextComponents = {
  types: {
    image: (props: any) => h(ImageRenderer, props),
    codeBlock: codeBlockRenderer,
    callout: calloutRenderer,
  },
  block: {
    h1: convertEmptyContentToBr("h1", "text-1 text-(--foreground)"),
    h2: convertEmptyContentToBr("h2", "text-2 text-(--foreground)"),
    h3: convertEmptyContentToBr("h3", "text-3 text-(--foreground)"),
    h4: convertEmptyContentToBr("h4", "text-4 text-(--foreground)"),
    h5: convertEmptyContentToBr("h5", "text-5 text-(--foreground)"),
    h6: convertEmptyContentToBr("h6", "text-6 text-(--foreground)"),
    normal: convertEmptyContentToBr("p", "text-7 text-(--foreground-secondary)"),
    blockquote: convertEmptyContentToBr(
      "blockquote",
      "border-l-4 border-(--neutral-400) pl-4 text-7 text-(--foreground)"
    ),
  },
  list: {
    bullet: (_, { slots }) =>
      h("ul", { class: "pl-6 list-disc text-7 text-(--foreground-secondary)" }, slots.default?.()),
    number: (_, { slots }) =>
      h(
        "ol",
        { class: "pl-6 list-decimal text-7 text-(--foreground-secondary)" },
        slots.default?.()
      ),
  },
  marks: {
    strong: (_, { slots }) =>
      h("strong", { class: "font-bold text-(--foreground-secondary)" }, slots.default?.()),
    em: (_, { slots }) =>
      h("em", { class: "italic text-(--foreground-secondary)" }, slots.default?.()),
    link: ({ value }, { slots }) => {
      let href = value?.href || "";
      const target = (href || "").startsWith("http") ? "_blank" : undefined;
      if (href && !/^https?:\/\//i.test(href)) {
        href = `https://${href}`;
      }

      return h(
        "a",
        {
          href,
          class: "link",
          target,
          rel: target === "_blank" ? "nofollow noopener noreferrer" : undefined,
        },
        slots.default?.()
      );
    },
  },
};
