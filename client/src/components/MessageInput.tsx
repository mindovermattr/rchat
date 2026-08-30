import { ActionIcon, Box, Group, Tooltip } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useAction } from "@reatom/react";
import { IconArrowRight, IconBold, IconItalic, IconLink, IconList, IconSend } from "@tabler/icons-react";
import { Link } from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { sendMessage } from "../model";

export function MessageInput() {
  const handleSend = useAction(sendMessage);

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false, autolink: true })],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "tiptap-input" },
      handleKeyDown: (_view, event) => {
        if (event.key !== "Enter" || event.shiftKey) return false;
        event.preventDefault();
        if (editor && !editor.isEmpty) {
          handleSend(editor.getHTML());
          editor.commands.clearContent();
        }
        return true;
      },
    },
  });

  if (!editor) return null;

  const submit = () => {
    const html = editor.getHTML();
    if (editor.isEmpty) return;
    handleSend(html);
    editor.commands.clearContent();
  };

  return (
    <Box p="md" style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}>
      <Group align="flex-end" wrap="nowrap">
        <RichTextEditor editor={editor} style={{ flex: 1 }}>
          <RichTextEditor.Toolbar sticky stickyOffset={0}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold>
                <IconBold size={16} />
              </RichTextEditor.Bold>
              <RichTextEditor.Italic>
                <IconItalic size={16} />
              </RichTextEditor.Italic>
              <RichTextEditor.BulletList>
                <IconList size={16} />
              </RichTextEditor.BulletList>
              <RichTextEditor.Link>
                <IconLink size={16} />
              </RichTextEditor.Link>
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content />
        </RichTextEditor>
        <Tooltip label="Отправить (Enter)">
          <ActionIcon size="lg" radius="xl" color="blue" variant="filled" onClick={submit} disabled={editor.isEmpty}>
            <IconSend size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Group gap={4} mt={4}>
        <IconArrowRight size={12} />
        <Box component="span" size="xs" c="dimmed" style={{ fontSize: 11 }}>
          Enter — отправить, Shift+Enter — новая строка
        </Box>
      </Group>
    </Box>
  );
}
