import React from 'react';
import GlobalCMSEditor from '@/components/dashboard/cms/GlobalEditor';
import AdvancedCMSEditor from '@/components/dashboard/cms/AdvancedEditor';

export default function CMSPage() {
  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-12">
      <AdvancedCMSEditor />
      <hr className="border-border" />
      <GlobalCMSEditor />
    </div>
  );
}
