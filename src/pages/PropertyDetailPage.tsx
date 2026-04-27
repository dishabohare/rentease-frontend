import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import InquiryModal from "@/components/InquiryModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, CheckCircle2, Bed, Bath, Car, Maximize, Calendar,
  Heart, Send, Phone, ArrowLeft, Share2, Wifi, Dumbbell, Shield,
  Droplets, Zap, Users, TreePine,
} from "lucide-react";

const amenityIcons: Record<string, any> = {
  WiFi: Wifi, Gym: Dumbbell, Security: Shield, Parking: Car,
  "Swimming Pool": Droplets, "Power Backup": Zap, Lift: Zap,
  Clubhouse: Users, Garden: TreePine,
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8082/api/properties/${id}`)
      .then(res => setProperty(res.data))
      .catch(err => console.log(err));
  }, [id]);

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

  const similar = [];

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
                <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover" />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {[property.imageUrl].map((img, i) => (
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
                  <Badge className="bg-success text-success-foreground border-0 gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </Badge>
                )}
                <Badge variant="secondary">{property.type}</Badge>
                <Badge variant="secondary">{property.furnished}</Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{property.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />{property.location}, {property.city}
              </p>
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

          </div>

          {/* Right side same */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
