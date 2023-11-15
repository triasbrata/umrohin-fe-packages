'use client'

import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

import MenuBar from './MenuBar'
import styles from './index.module.css'

type Props = {
  initialValue?: string
  onChange?: (arg: string) => void
}

export const TipTapEditor = (props: Props) => {
  const { initialValue, onChange } = props
  const [content] = useState<string>(initialValue ?? '')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    content,
  })

  return (
    <div className={styles.editor}>
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  )
}
