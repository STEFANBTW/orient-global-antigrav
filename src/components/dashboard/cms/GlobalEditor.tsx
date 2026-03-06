import React, { useState } from 'react';
import { useCMS } from '@/context/cms-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Globe, Info, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function GlobalCMSEditor() {
  const { state, updateGlobal } = useCMS();
  const { toast } = useToast();
  
  // Local state for form handling
  const [homepage, setHomepage] = useState(state.global.homepage);
  const [about, setAbout] = useState(state.global.about);
  const [contact, setContact] = useState(state.global.contact);

  const handleHomepageSave = () => {
    updateGlobal('homepage', homepage);
    toast({ title: "Homepage Updated", description: "Changes have been saved globally." });
  };

  const handleAboutSave = () => {
    updateGlobal('about', about);
    toast({ title: "About Us Updated", description: "Company story updated." });
  };

  const handleContactSave = () => {
    updateGlobal('contact', contact);
    toast({ title: "Contact Info Updated", description: "Contact details updated." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Global Content Manager</h2>
          <p className="text-muted-foreground">Manage the content for the public-facing website.</p>
        </div>
      </div>

      <Tabs defaultValue="homepage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="homepage" className="flex items-center gap-2"><Globe className="w-4 h-4" /> Homepage</TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2"><Info className="w-4 h-4" /> About Us</TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2"><Phone className="w-4 h-4" /> Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Settings</CardTitle>
              <CardDescription>Customize the hero section and announcements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hero Title</Label>
                <Input 
                  value={homepage.heroTitle} 
                  onChange={(e) => setHomepage({...homepage, heroTitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Hero Subtitle</Label>
                <Textarea 
                  value={homepage.heroSubtitle} 
                  onChange={(e) => setHomepage({...homepage, heroSubtitle: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="space-y-0.5">
                  <Label>Announcement Bar</Label>
                  <p className="text-sm text-muted-foreground">Show a banner at the top of the site.</p>
                </div>
                <Switch 
                  checked={homepage.announcement.active}
                  onCheckedChange={(checked) => setHomepage({...homepage, announcement: {...homepage.announcement, active: checked}})}
                />
              </div>
              {homepage.announcement.active && (
                <div className="space-y-2">
                  <Label>Announcement Text</Label>
                  <Input 
                    value={homepage.announcement.text} 
                    onChange={(e) => setHomepage({...homepage, announcement: {...homepage.announcement, text: e.target.value}})}
                  />
                </div>
              )}
              <Button onClick={handleHomepageSave} className="w-full"><Save className="w-4 h-4 mr-2" /> Save Homepage</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
              <CardDescription>Tell the Orient story.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mission Statement</Label>
                <Textarea 
                  value={about.mission} 
                  onChange={(e) => setAbout({...about, mission: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Our Story</Label>
                <Textarea 
                  className="min-h-[150px]"
                  value={about.story} 
                  onChange={(e) => setAbout({...about, story: e.target.value})}
                />
              </div>
              <Button onClick={handleAboutSave} className="w-full"><Save className="w-4 h-4 mr-2" /> Save About Us</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update how customers reach you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                    value={contact.email} 
                    onChange={(e) => setContact({...contact, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    value={contact.phone} 
                    onChange={(e) => setContact({...contact, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Physical Address</Label>
                <Input 
                  value={contact.address} 
                  onChange={(e) => setContact({...contact, address: e.target.value})}
                />
              </div>
              <Button onClick={handleContactSave} className="w-full"><Save className="w-4 h-4 mr-2" /> Save Contact Info</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
