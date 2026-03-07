"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cmsApi } from '@/services/cmsApi';
import { useToast } from '@/components/ui/use-toast';
import { Save, Globe, Phone, Building, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GlobalCMSEditor() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null); // tracks which section is saving

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await cmsApi.getAdminGlobalSettings();
      setSettings(res.settings);
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to load global settings.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string) => {
    setSaving(section);
    try {
      await cmsApi.updateGlobalSettings(section, settings[section]);
      toast({ title: '✅ Saved', description: `${section.charAt(0).toUpperCase() + section.slice(1)} settings updated.` });
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to save.', variant: 'destructive' });
    } finally {
      setSaving(null);
    }
  };

  const updateField = (section: string, field: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const updateNestedField = (section: string, parent: string, field: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: { ...prev[section][parent], [field]: value }
      }
    }));
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-sm text-slate-400 uppercase tracking-widest font-bold">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Global Site Settings</h2>
        <p className="text-sm text-muted-foreground">Configure site-wide settings visible across all divisions.</p>
      </div>

      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="homepage" className="gap-1.5"><Globe className="w-3.5 h-3.5" /> Homepage</TabsTrigger>
          <TabsTrigger value="about" className="gap-1.5"><Building className="w-3.5 h-3.5" /> About</TabsTrigger>
          <TabsTrigger value="contact" className="gap-1.5"><Phone className="w-3.5 h-3.5" /> Contact</TabsTrigger>
          <TabsTrigger value="footer" className="gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> Footer</TabsTrigger>
        </TabsList>

        {/* Homepage */}
        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Homepage Settings</CardTitle>
              <CardDescription>Hero section and announcement bar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Hero Title</Label>
                <Input value={settings.homepage?.heroTitle || ''} onChange={(e) => updateField('homepage', 'heroTitle', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Hero Subtitle</Label>
                <Textarea value={settings.homepage?.heroSubtitle || ''} onChange={(e) => updateField('homepage', 'heroSubtitle', e.target.value)} className="min-h-[80px]" />
              </div>
              <div className="border-t pt-4 space-y-3">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Announcement Bar</Label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={settings.homepage?.announcement?.active || false}
                    onCheckedChange={(v) => updateNestedField('homepage', 'announcement', 'active', v)}
                  />
                  <span className="text-sm text-slate-600">{settings.homepage?.announcement?.active ? 'Active' : 'Hidden'}</span>
                </div>
                <Input
                  value={settings.homepage?.announcement?.text || ''}
                  onChange={(e) => updateNestedField('homepage', 'announcement', 'text', e.target.value)}
                  placeholder="Announcement text..."
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={() => saveSection('homepage')} disabled={saving === 'homepage'}>
                  <Save className="w-4 h-4 mr-2" /> {saving === 'homepage' ? 'Saving...' : 'Save Homepage'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">About Us</CardTitle>
              <CardDescription>Mission, story, and values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Mission Statement</Label>
                <Textarea value={settings.about?.mission || ''} onChange={(e) => updateField('about', 'mission', e.target.value)} className="min-h-[80px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Our Story</Label>
                <Textarea value={settings.about?.story || ''} onChange={(e) => updateField('about', 'story', e.target.value)} className="min-h-[120px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Values (comma-separated)</Label>
                <Input value={(settings.about?.values || []).join(', ')} onChange={(e) => updateField('about', 'values', e.target.value.split(',').map((s: string) => s.trim()))} />
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={() => saveSection('about')} disabled={saving === 'about'}>
                  <Save className="w-4 h-4 mr-2" /> {saving === 'about' ? 'Saving...' : 'Save About'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
              <CardDescription>Contact details and social links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</Label>
                  <Input value={settings.contact?.email || ''} onChange={(e) => updateField('contact', 'email', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone</Label>
                  <Input value={settings.contact?.phone || ''} onChange={(e) => updateField('contact', 'phone', e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Address</Label>
                <Input value={settings.contact?.address || ''} onChange={(e) => updateField('contact', 'address', e.target.value)} />
              </div>
              <div className="border-t pt-4">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 block">Social Media</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-slate-400">Twitter</Label>
                    <Input value={settings.contact?.social?.twitter || ''} onChange={(e) => updateNestedField('contact', 'social', 'twitter', e.target.value)} placeholder="@handle" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-slate-400">Instagram</Label>
                    <Input value={settings.contact?.social?.instagram || ''} onChange={(e) => updateNestedField('contact', 'social', 'instagram', e.target.value)} placeholder="@handle" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-slate-400">LinkedIn</Label>
                    <Input value={settings.contact?.social?.linkedin || ''} onChange={(e) => updateNestedField('contact', 'social', 'linkedin', e.target.value)} placeholder="Company name" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={() => saveSection('contact')} disabled={saving === 'contact'}>
                  <Save className="w-4 h-4 mr-2" /> {saving === 'contact' ? 'Saving...' : 'Save Contact'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Footer Settings</CardTitle>
              <CardDescription>Copyright text and tagline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Copyright Text</Label>
                <Input value={settings.footer?.copyright || ''} onChange={(e) => updateField('footer', 'copyright', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Tagline</Label>
                <Input value={settings.footer?.tagline || ''} onChange={(e) => updateField('footer', 'tagline', e.target.value)} />
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={() => saveSection('footer')} disabled={saving === 'footer'}>
                  <Save className="w-4 h-4 mr-2" /> {saving === 'footer' ? 'Saving...' : 'Save Footer'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
