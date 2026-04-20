import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Upload, Eye, Send } from "lucide-react";

const amenitiesList = ["WiFi", "AC", "Power Backup", "Lift", "Security", "Gym", "Swimming Pool", "Parking", "Garden", "Clubhouse", "Washing Machine", "Water Supply"];

export default function AddPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleAmenity = (a: string) => setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  if (submitted) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container flex flex-col items-center py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-6">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Property Submitted!</h1>
        <p className="mt-3 text-muted-foreground max-w-md">Your property listing has been submitted for verification. You'll be notified once it's approved.</p>
        <Button className="mt-6 bg-gradient-hero" onClick={() => setSubmitted(false)}>Add Another Property</Button>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-3xl py-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">List Your Property</h1>
        <p className="text-muted-foreground mb-8">Fill in the details below to list your property on RentEase — it's free!</p>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
          {/* Basic */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Basic Details</h2>
            <div>
              <Label>Property Title</Label>
              <Input placeholder="e.g. Sunny 2BHK in Koramangala" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Property Type</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="independent">Independent House</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>BHK</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select BHK" /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5].map((b) => <SelectItem key={b} value={String(b)}>{b} BHK</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Location</h2>
            <div>
              <Label>Full Address</Label>
              <Input placeholder="Street, area, landmark" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>City</Label><Input placeholder="e.g. Bangalore" required /></div>
              <div><Label>Area / Locality</Label><Input placeholder="e.g. Koramangala" required /></div>
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Pricing & Details</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><Label>Monthly Rent (₹)</Label><Input type="number" placeholder="25000" required /></div>
              <div><Label>Deposit (₹)</Label><Input type="number" placeholder="100000" required /></div>
              <div><Label>Area (sqft)</Label><Input type="number" placeholder="1100" required /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Furnishing</Label>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="semi">Semi-Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Available From</Label><Input type="date" required /></div>
            </div>
          </section>

          {/* Amenities */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Amenities</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {amenitiesList.map((a) => (
                <label key={a} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={amenities.includes(a)} onCheckedChange={() => toggleAmenity(a)} />
                  <span className="text-sm text-foreground">{a}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Description & Images */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Description & Images</h2>
            <div>
              <Label>Property Description</Label>
              <Textarea placeholder="Describe your property in detail..." rows={5} required />
            </div>
            <div>
              <Label>Upload Images</Label>
              <div className="mt-2 flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click or drag to upload images</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB each</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Contact Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>Your Name</Label><Input placeholder="Full name" required /></div>
              <div><Label>Phone</Label><Input type="tel" placeholder="+91 99999 99999" required /></div>
            </div>
          </section>

          <div className="flex gap-3">
            <Button type="button" variant="outline" size="lg" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />Preview Listing
            </Button>
            <Button type="submit" size="lg" className="flex-1 bg-gradient-hero hover:opacity-90">
              <Send className="mr-2 h-4 w-4" />Submit Property
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
