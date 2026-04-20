import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import InquiryModal from "@/components/InquiryModal";
import { properties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, CheckCircle2, Bed, Bath, Car, Maximize, Calendar,
  Heart, Send, Phone, ArrowLeft, Share2, Wifi, Dumbbell, Shield,
  Droplets, Zap, Users, TreePine,
} from "lucide-react";
import { useState } from "react";

const amenityIcons: Record<string, any> = {
  WiFi: Wifi, Gym: Dumbbell, Security: Shield, Parking: Car,
  "Swimming Pool": Droplets, "Power Backup": Zap, Lift: Zap,
  Clubhouse: Users, Garden: TreePine,
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [selectedImg, setSelectedImg] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!property) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Property Not Found</h1>
        <Button asChild className="mt-4"><Link to="/explore">Back to Explore</Link></Button>
      </div>
      <Footer />
    </div>
  );

  const similar = properties.filter((p) => p.id !== property.id && p.city === property.city).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6">
        <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: images + details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <div className="space-y-3">
              <div className="overflow-hidden rounded-xl aspect-[16/10]">
                <img src={property.images[selectedImg]} alt={property.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImg(i)}
                    className={`shrink-0 overflow-hidden rounded-lg h-16 w-20 border-2 transition-all ${selectedImg === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {property.verified && (
                  <Badge className="bg-success text-success-foreground border-0 gap-1"><CheckCircle2 className="h-3 w-3" /> Verified</Badge>
                )}
                <Badge variant="secondary">{property.type}</Badge>
                <Badge variant="secondary">{property.furnished}</Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{property.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{property.location}, {property.city}</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Bed, label: "Bedrooms", val: property.bedrooms },
                { icon: Bath, label: "Bathrooms", val: property.bathrooms },
                { icon: Maximize, label: "Area", val: `${property.area} sqft` },
                { icon: Car, label: "Parking", val: property.parking ? "Yes" : "No" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-card p-3 text-center">
                  <s.icon className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{s.val}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">About this property</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.amenities.map((a) => {
                  const Icon = amenityIcons[a] || CheckCircle2;
                  return (
                    <div key={a} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Location</h2>
              <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30">
                <div className="text-center text-muted-foreground">
                  <MapPin className="mx-auto h-8 w-8 mb-2" />
                  <p className="text-sm">Map integration coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: pricing + owner */}
          <div className="space-y-4">
            <div className="sticky top-20 space-y-4">
              {/* Price card */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-elevated">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">₹{property.rent.toLocaleString()}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="mb-5 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Deposit</span><span className="font-medium">₹{property.deposit.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Available from</span><span className="font-medium">{new Date(property.availableFrom).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Brokerage</span><span className="font-medium text-success">₹0 (Free!)</span></div>
                </div>

                <div className="space-y-2">
                  <InquiryModal propertyTitle={property.title} ownerName={property.ownerName}>
                    <Button className="w-full bg-gradient-hero hover:opacity-90 h-11"><Send className="mr-2 h-4 w-4" />Send Inquiry</Button>
                  </InquiryModal>
                  <Button variant="outline" className="w-full h-11"><Phone className="mr-2 h-4 w-4" />Contact Owner</Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSaved(!saved)}>
                      <Heart className={`mr-1 h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`} />{saved ? "Saved" : "Save"}
                    </Button>
                    <Button variant="ghost" size="sm"><Share2 className="mr-1 h-4 w-4" />Share</Button>
                  </div>
                </div>
              </div>

              {/* Owner card */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Property Owner</h3>
                <div className="flex items-center gap-3">
                  <img src={property.ownerAvatar} alt={property.ownerName} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-foreground">{property.ownerName}</p>
                    <p className="text-xs text-muted-foreground">{property.ownerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Availability</h3>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Available from {new Date(property.availableFrom).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Similar Properties</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
