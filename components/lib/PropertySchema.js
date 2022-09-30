const PropertySchema = {
  video: "",
  title: "",
  photos: [""],
  address_1: "",
  address_2: "",
  type: "lease",
  space_use: "office",
  for: "",
  country: "us",
  state: "",
  city: "",
  zip_code: 0,
  year_built: 0,
  renovated: false,
  renovated_year: 0,
  building_size: 0,
  lot_size: 0,
  price: 0,
  construction_type: "",
  sewer: "city",
  electricity: "commercial",
  zoning: "",
  highlights: [],
  featured: false,
  importance: 0,
  gps: {
    lat: 37.6,
    lng: -95.665,
  },
  floors: [],
  nearby: [],
};

export const floorSchema = {
  floor_number: 0,
  floor_size: 0,
  term: "negotiable",
  rate: 0,
  space_use: "office",
  condition: "ready to use",
  amenities: [],
  period_of_tenure: 0,
  avaliable: true,
};
export const nearbySchema = {
  amenity: "",
  distance: "",
};

export default PropertySchema;
