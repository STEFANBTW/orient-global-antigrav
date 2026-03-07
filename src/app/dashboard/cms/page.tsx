import React from 'react';
import GlobalCMSEditor from '@/components/dashboard/cms/GlobalEditor';
import BlockEditorFactory from '@/components/dashboard/cms/BlockEditor';

export default function CMSPage() {
  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-12">
      <BlockEditorFactory />
      <hr className="border-border" />
      <GlobalCMSEditor />
    </div>
  );
}

