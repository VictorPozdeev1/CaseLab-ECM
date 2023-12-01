import type { FC } from 'react';

interface CreateDocumentFormProps {
  onSubmit: (
    attributeValues: Array<{ attributeId: number; attributeValue: string }>,
  ) => void;
  onCancel: () => void;
}

export const CreateDocumentForm: FC<CreateDocumentFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit([
          { attributeId: 1, attributeValue: 'a1' },
          { attributeId: 2, attributeValue: 'dsjfh' },
        ]);
      }}
      style={{ border: 'solid' }}
    >
      Это форма для создания документа. Тут будут отображаться атрибуты и прочая
      нужная инфа.
      {['attr1', 'attr2'].map((attr) => (
        <div key={attr}>{attr}</div>
      ))}
      <button type="submit">Ок</button>
      <button
        type="button"
        onClick={() => {
          onCancel();
        }}
      >
        Отмена
      </button>
    </form>
  );
};
