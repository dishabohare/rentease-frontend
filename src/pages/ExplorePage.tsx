import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";

const propertyTypes = ["All", "Apartment", "Villa", "Penthouse"];
const bhkOptions = ["Any", "1", "2", "3", "4+"];
const furnishOptions = ["All", "Furnished", "Semi-Furnished", "Unfurnished"];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [bhk, setBhk] = useState("Any");
  const [furnish, setFurnish] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...properties];
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));
    if (type !== "All") list = list.filter((p) => p.type === type);
    if (bhk !== "Any") list = list.filter((p) => (bhk === "4+" ? p.bhk >= 4 : p.bhk === parseInt(bhk)));
    if (furnish !== "All") list = list.filter((p) => p.furnished === furnish);
    if (verifiedOnly) list = list.filter((p) => p.verified);
    if (sort === "price-low") list.sort((a, b) => a.rent - b.rent);
    else if (sort === "price-high") list.sort((a, b) => b.rent - a.rent);
    return list;
  }, [search, type, bhk, furnish, verifiedOnly, sort]);

  const activeFilters = [type !== "All" && type, bhk !== "Any" && `${bhk} BHK`, furnish !== "All" && furnish, verifiedOnly && "Verified"].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Explore Properties</h1>
          <p className="mt-1 text-muted-foreground">Browse {properties.length}+ verified rental listings across Bangalore</p>
        </div>

        {/* Search + Filters */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by location, title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="mr-1.5 h-4 w-4" />Filters
            </Button>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low → High</SelectItem>
                <SelectItem value="price-high">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-card animate-fade-in">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Property Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{propertyTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">BHK</label>
                <Select value={bhk} onValueChange={setBhk}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{bhkOptions.map((b) => <SelectItem key={b} value={b}>{b === "Any" ? "Any BHK" : `${b} BHK`}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Furnishing</label>
                <Select value={furnish} onValueChange={setFurnish}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{furnishOptions.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Verification</label>
                <Button variant={verifiedOnly ? "default" : "outline"} size="sm" className={verifiedOnly ? "bg-gradient-hero" : ""} onClick={() => setVerifiedOnly(!verifiedOnly)}>
                  Verified Only
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <Badge key={f as string} variant="secondary" className="gap-1">
                {f as string}
                <X className="h-3 w-3 cursor-pointer" onClick={() => {
                  if (f === type) setType("All");
                  if ((f as string).includes("BHK")) setBhk("Any");
                  if (f === furnish) setFurnish("All");
                  if (f === "Verified") setVerifiedOnly(false);
                }} />
              </Badge>
            ))}
            <button className="text-xs text-primary hover:underline" onClick={() => { setType("All"); setBhk("Any"); setFurnish("All"); setVerifiedOnly(false); }}>
              Clear all
            </button>
          </div>
        )}

        {/* Results */}
        <p className="mb-4 text-sm text-muted-foreground">{filtered.length} properties found</p>
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No properties found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
