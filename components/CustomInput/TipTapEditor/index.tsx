'use client'

import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import MenuBar from './MenuBar'
import styles from './index.module.css'

type Props = {
  initialValue?: string
  onChange?: (arg: string) => void
  disabled?: boolean
}

export const TipTapEditor = (props: Props) => {
  const { initialValue, onChange, disabled = false } = props
  const editor = useEditor(
    {
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
      content: initialValue ?? '',
      editable: !disabled,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      },
    },
    [initialValue]
  )

  useEffect(() => {
    editor?.commands.setContent(initialValue ?? '')
  }, [initialValue])

  return (
    <div className={styles.editor}>
      {editor && !disabled && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  )
}
