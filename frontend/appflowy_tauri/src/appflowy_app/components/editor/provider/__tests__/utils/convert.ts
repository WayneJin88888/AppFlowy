/**
 * @jest-environment jsdom
 */
import { slateNodesToInsertDelta } from '@slate-yjs/core';
import * as Y from 'yjs';
import { generateId } from '$app/components/editor/provider/utils/convert';

export function slateElementToYText({
  children,
  ...attributes
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const yElement = new Y.XmlText();

  Object.entries(attributes).forEach(([key, value]) => {
    yElement.setAttribute(key, value);
  });
  yElement.applyDelta(slateNodesToInsertDelta(children), {
    sanitize: false,
  });
  return yElement;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateInsertTextOp(text: string, parentId: string, level: number, attributes?: Record<string, any>) {
  const insertYText = slateElementToYText({
    children: [{ text: text }],
    type: 'paragraph',
    data: {},
    blockId: generateId(),
    parentId,
    textId: generateId(),
    level,
  });

  return {
    insert: insertYText,
    attributes,
  };
}

export function genersteMentionInsertTextOp() {
  const mentionYText = slateElementToYText({
    children: [{ text: '@' }],
    type: 'mention',
    data: {
      page: 'page_id',
    },
  });

  return {
    insert: mentionYText,
  };
}

export function generateFormulaInsertTextOp() {
  const formulaYText = slateElementToYText({
    children: [{ text: '= 1 + 1' }],
    type: 'formula',
    data: true,
  });

  return {
    insert: formulaYText,
  };
}
