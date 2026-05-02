export type CityPage = {
  slug: string
  displayName: string
  state: string
  deliveryNote: string    // "Ships from Goa in 4 days, arrives in 3–7"
  reviewerNote?: string   // "We have customers in [city]..." - only if true
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const cities: CityPage[] = [
  {
    slug: 'bangalore',
    displayName: 'Bangalore',
    state: 'Karnataka',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Bangalore via reliable courier partners. Orders are typically processed and dispatched within 7 to 10 days of being placed.',
    reviewerNote: 'We have many loyal customers in Bangalore, including Lisha and Snehal, who value our commitment to high-quality, SLS-free personal care.',
    faqs: [
      {
        q: 'How long does delivery to Bangalore take?',
        a: 'After dispatch from our Goa workshop, delivery to Bangalore typically takes 1 to 2 business days. We provide tracking details for every order.'
      },
      {
        q: 'Are your soaps suitable for Bangalore water?',
        a: 'Yes, our soaps are formulated to provide a gentle wash even in areas with hard water, which is common in many parts of Bangalore.'
      },
      {
        q: 'Can I get cash on delivery in Bangalore?',
        a: 'Yes, we offer cash on delivery options for our customers in Bangalore to make the ordering process as convenient as possible.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'mumbai',
    displayName: 'Mumbai',
    state: 'Maharashtra',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Mumbai via reliable courier partners. Every bar is made to order to ensure freshness.',
    faqs: [
      {
        q: 'Do you ship to all areas in Mumbai?',
        a: 'Yes, we ship to all pin codes in Mumbai and the surrounding metropolitan region from our workshop in South Goa.'
      },
      {
        q: 'How are the soaps packed for Mumbai shipping?',
        a: 'We use minimal and recyclable packaging to protect the bars during transit while remaining mindful of our environmental impact.'
      },
      {
        q: 'Are the soaps SLS-free?',
        a: 'Yes, all our soaps are genuinely SLS-free and made without parabens or synthetic fragrances, making them gentle for daily use.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'pune',
    displayName: 'Pune',
    state: 'Maharashtra',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Pune using trusted courier services. Our small-batch process ensures high quality in every bar.',
    faqs: [
      {
        q: 'What is the shipping cost to Pune?',
        a: 'We offer free shipping on all orders across India, including deliveries to Pune, with no minimum order requirement.'
      },
      {
        q: 'Are these soaps suitable for Pune weather?',
        a: 'Our soaps are built on nourishing bases like goat milk and shea butter, providing a moisturising feel that suits various climates.'
      },
      {
        q: 'Can I track my order to Pune?',
        a: 'Yes, once your order is dispatched from Goa, we will share a tracking link so you can monitor its progress to your doorstep.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'delhi',
    displayName: 'Delhi',
    state: 'NCR',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Delhi and the NCR region via reliable courier partners. Each order is made to order with care.',
    faqs: [
      {
        q: 'How long is the curing time before shipping to Delhi?',
        a: 'Our soaps are made and cured in Goa. The typical window from order to dispatch is 7 to 10 days, ensuring you receive a recently cured bar.'
      },
      {
        q: 'Is the soap suitable for sensitive skin?',
        a: 'Yes, our soaps are designed to be gentle and are suitable for sensitive skin types, relying on natural ingredients and traditional methods.'
      },
      {
        q: 'What bases do you use for your soap?',
        a: 'We offer three distinct bases: goat milk for a creamy wash, glycerin for a light feel, and shea butter for intensive conditioning.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'hyderabad',
    displayName: 'Hyderabad',
    state: 'Telangana',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Hyderabad via trusted courier partners. Our soaps are free from synthetic additives.',
    faqs: [
      {
        q: 'Do you use synthetic fragrance in your soap?',
        a: 'No, we use only natural essential oils and botanicals to provide a gentle and authentic aromatic experience.'
      },
      {
        q: 'Is handmade soap better than commercial soap?',
        a: 'Handmade soap retains natural glycerin, a humectant that draws moisture to the skin, providing a softer feel than many commercial detergent bars.'
      },
      {
        q: 'How do I store the soap to make it last longer?',
        a: 'We recommend keeping the bar in a well-draining soap dish between uses to allow it to dry completely.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'chennai',
    displayName: 'Chennai',
    state: 'Tamil Nadu',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Chennai using reliable courier services. Every order is crafted with traditional care.',
    faqs: [
      {
        q: 'Are the ingredients locally sourced?',
        a: 'We source many of our botanicals, like neem and tulsi, directly from our own farm in South Goa to ensure quality and freshness.'
      },
      {
        q: 'Can I use these soaps on my face?',
        a: 'Yes, our natural soaps are formulated to be gentle enough for use on both the face and the body.'
      },
      {
        q: 'How do I know which soap to choose?',
        a: 'We recommend starting with our goat milk base if you have sensitive or dry skin, or our glycerin base for a lighter, clean wash.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'goa',
    displayName: 'Goa',
    state: 'Goa',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to all parts of the state. As we are local, you can expect a reliable and efficient delivery process.',
    reviewerNote: 'We are proud to serve our local community in Goa, where customers like Krutika value our traditional and SLS-free approach to personal care.',
    faqs: [
      {
        q: 'Do you have a physical store in Goa?',
        a: 'We currently operate primarily as an online workshop to ensure every bar is made to order and cured correctly before reaching you.'
      },
      {
        q: 'Can I visit the farm in South Goa?',
        a: 'Our property is a working farm and workshop. While we focus on production, we love connecting with our local community through our products.'
      },
      {
        q: 'What ingredients do you grow on the farm?',
        a: 'We grow several of our key botanicals, including neem and tulsi, right here on our farm in South Goa.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'kolkata',
    displayName: 'Kolkata',
    state: 'West Bengal',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Kolkata via trusted courier partners. Our soaps are made in small batches for quality.',
    faqs: [
      {
        q: 'Is shipping to Kolkata free?',
        a: 'Yes, we provide free shipping on all orders to Kolkata and across India, with no minimum purchase required.'
      },
      {
        q: 'Are the soaps made with natural oils?',
        a: 'Yes, we use traditional saponified oils to create our bases, ensuring a gentle wash without the need for harsh detergents.'
      },
      {
        q: 'How can I pay for my order from Kolkata?',
        a: 'We accept various payment methods, including UPI, credit/debit cards, and cash on delivery for your convenience.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'ahmedabad',
    displayName: 'Ahmedabad',
    state: 'Gujarat',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Ahmedabad via reliable courier partners. Every bar is SLS-free and made with care.',
    faqs: [
      {
        q: 'Do your soaps contain parabens?',
        a: 'No, all Healing Soil soaps are formulated without parabens, SLS, or any synthetic preservatives.'
      },
      {
        q: 'What makes your soap different from store-bought ones?',
        a: 'Our soaps retain natural glycerin and use nourishing bases like goat milk, providing a creamier lather and a softer skin feel.'
      },
      {
        q: 'Do you offer a variety pack?',
        a: 'Yes, we have a starter bundle that includes different bases, allowing you to find the one that best suits your skin type.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'jaipur',
    displayName: 'Jaipur',
    state: 'Rajasthan',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Jaipur using trusted courier services. Our soaps are crafted for a gentle wash.',
    faqs: [
      {
        q: 'Is the soap suitable for dry weather in Jaipur?',
        a: 'Yes, our shea butter and goat milk bases provide a moisturising feel that is very helpful in drier climates.'
      },
      {
        q: 'What ingredients are in the Kesar Haldi soap?',
        a: 'Our Kesar Haldi soap uses real saffron and turmeric, valued in traditional care for their warm and gentle properties.'
      },
      {
        q: 'How long does a single bar last?',
        a: 'With proper storage in a dry soap dish, a single bar can typically last for 4 to 6 weeks of daily use.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'surat',
    displayName: 'Surat',
    state: 'Gujarat',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Surat via reliable courier partners. Each bar is made to order to ensure quality.',
    faqs: [
      {
        q: 'Do you ship to industrial areas in Surat?',
        a: 'Yes, we deliver to all residential and commercial pin codes in Surat from our workshop in Goa.'
      },
      {
        q: 'Are the scents from natural oils?',
        a: 'Yes, we use natural botanicals and essential oils to provide our bars with their earthy and fresh aromatic profiles.'
      },
      {
        q: 'Is the packaging eco-friendly?',
        a: 'We use minimal and recyclable packaging for all our orders to Surat, reflecting our commitment to mindful waste reduction.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'lucknow',
    displayName: 'Lucknow',
    state: 'Uttar Pradesh',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Lucknow via trusted courier partners. Our process follows traditional soap-making methods.',
    faqs: [
      {
        q: 'What is the dispatch time to Lucknow?',
        a: 'We typically dispatch orders within 7 to 10 days of placement, as every bar is made to order and needs time to cure.'
      },
      {
        q: 'Are these soaps suitable for gifting?',
        a: 'Yes, our handmade soaps make for a very thoughtful and personal gift. We also offer gift packaging options.'
      },
      {
        q: 'Do you use animal fats?',
        a: 'No, we do not use animal fats. Our bases are made from high-quality vegetable oils and goat milk.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'kochi',
    displayName: 'Kochi',
    state: 'Kerala',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Kochi using reliable courier services. Our ingredients are chosen for a gentle wash.',
    faqs: [
      {
        q: 'Do you use coconut oil in your soaps?',
        a: 'Yes, saponified coconut oil is a key ingredient in our bases, providing a gentle and effective lather.'
      },
      {
        q: 'Are the soaps suitable for humid climates?',
        a: 'Yes, our glycerin-based soaps provide a light and fresh wash that is ideal for humid weather.'
      },
      {
        q: 'Can I track my order to Kochi?',
        a: 'Absolutely. We will provide a tracking link once your order is dispatched from our Goa workshop.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'coimbatore',
    displayName: 'Coimbatore',
    state: 'Tamil Nadu',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Coimbatore via trusted courier partners. Every bar is crafted with traditional care.',
    faqs: [
      {
        q: 'Is delivery to Coimbatore free?',
        a: 'Yes, we offer free shipping on all orders across India, including deliveries to Coimbatore.'
      },
      {
        q: 'Do you use synthetic foaming agents?',
        a: 'No, our soaps are genuinely SLS-free. The lather comes naturally from the saponified oils and fats in the base.'
      },
      {
        q: 'Are your soaps suitable for all ages?',
        a: 'Yes, our natural and gentle formulas are suitable for the whole family, from children to adults.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'indore',
    displayName: 'Indore',
    state: 'Madhya Pradesh',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Indore via reliable courier partners. Our soaps are made in small batches for quality.',
    faqs: [
      {
        q: 'What bases do you offer for Indore delivery?',
        a: 'We offer goat milk, glycerin, and shea butter bases, each providing a unique feel and lather for your personal care.'
      },
      {
        q: 'How are the soaps made?',
        a: 'We use traditional soap-making methods in Goa, ensuring that natural glycerin is retained in every bar we produce.'
      },
      {
        q: 'Are the botanicals real?',
        a: 'Yes, we use real botanicals like neem, tulsi, and turmeric in our soap batches to ensure an honest wash.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'bhopal',
    displayName: 'Bhopal',
    state: 'Madhya Pradesh',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Bhopal using trusted courier services. Our ingredients are chosen for a nourishing wash.',
    faqs: [
      {
        q: 'Do your soaps contain synthetic dyes?',
        a: 'No, the colours in our soaps come naturally from the botanicals and oils used in the traditional making process.'
      },
      {
        q: 'Is the soap suitable for sensitive skin?',
        a: 'Yes, all our soaps are designed to be gentle and are suitable for those with sensitive skin types.'
      },
      {
        q: 'How can I place a bulk order from Bhopal?',
        a: 'You can contact us directly via the website or WhatsApp to discuss bulk ordering and custom selections.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'nagpur',
    displayName: 'Nagpur',
    state: 'Maharashtra',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Nagpur via reliable courier partners. Every bar is crafted with intention and care.',
    faqs: [
      {
        q: 'How long does shipping to Nagpur take?',
        a: 'Once dispatched from Goa, delivery to Nagpur typically takes 2 to 4 business days. We will share tracking details with you.'
      },
      {
        q: 'Do you use palm oil in your soap?',
        a: 'We are mindful of our sourcing and focus on using sustainable vegetable oils that are traditionally used in soap-making.'
      },
      {
        q: 'Is the goat milk soap creamy?',
        a: 'Yes, our goat milk base produces a noticeably creamy and soft lather that feels nourishing on the skin.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'chandigarh',
    displayName: 'Chandigarh',
    state: 'Punjab/Haryana',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Chandigarh via trusted courier partners. Our soaps are free from harsh chemicals.',
    faqs: [
      {
        q: 'Are your soaps SLS-free?',
        a: 'Yes, all our soaps are genuinely SLS-free and made without synthetic detergents or foaming agents.'
      },
      {
        q: 'Which soap is best for winters in Chandigarh?',
        a: 'Our shea butter base is highly recommended for colder months as it provides a rich, conditioning feel for the skin.'
      },
      {
        q: 'Is there a minimum order for free shipping?',
        a: 'No, we provide free shipping on all orders to Chandigarh and across India, regardless of the order value.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'bhubaneswar',
    displayName: 'Bhubaneswar',
    state: 'Odisha',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Bhubaneswar using reliable courier services. Every order is made to order.',
    faqs: [
      {
        q: 'Do you ship to all parts of Bhubaneswar?',
        a: 'Yes, we deliver to all residential pin codes in Bhubaneswar from our workshop in South Goa.'
      },
      {
        q: 'Are the soaps made with real honey?',
        a: 'Yes, we use real honey in our soap batches, valued for its natural humectant properties.'
      },
      {
        q: 'How are the soaps protected during transit?',
        a: 'We use minimal yet sturdy packaging to ensure your handmade soaps arrive in perfect condition.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'guwahati',
    displayName: 'Guwahati',
    state: 'Assam',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Guwahati via trusted courier partners. Our soaps represent honest, small-batch care.',
    faqs: [
      {
        q: 'What is the delivery time to Guwahati?',
        a: 'Shipping to Guwahati may take 5 to 7 business days after dispatch from our Goa workshop. Tracking details will be provided.'
      },
      {
        q: 'Are your soaps suitable for all skin types?',
        a: 'Yes, with our three different bases, we have options suitable for oily, normal, dry, and sensitive skin types.'
      },
      {
        q: 'Do you use synthetic preservatives?',
        a: 'No, we use traditional methods and natural ingredients, avoiding synthetic preservatives and parabens.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'dehradun',
    displayName: 'Dehradun',
    state: 'Uttarakhand',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Dehradun using reliable courier services. Each bar is crafted with traditional care.',
    faqs: [
      {
        q: 'Is the soap suitable for the weather in Dehradun?',
        a: 'Yes, our nourishing bases like goat milk provide a gentle wash that suits the climate in Dehradun throughout the year.'
      },
      {
        q: 'Do you use real saffron in your soap?',
        a: 'Yes, our kesar soaps use high-quality saffron sourced from Kashmir for a traditional personal care experience.'
      },
      {
        q: 'What is the curing period for your soap?',
        a: 'Our soaps are cured correctly in Goa to ensure a high-quality bar. We typically dispatch 7 to 10 days after an order is placed.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'mysore',
    displayName: 'Mysore',
    state: 'Karnataka',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Mysore via trusted courier partners. Our soaps are free from synthetic additives.',
    faqs: [
      {
        q: 'Are these soaps similar to traditional Mysore soap?',
        a: 'While we also follow traditional soap-making values, our bars are made in small batches in Goa using our unique goat milk, glycerin, and shea butter bases.'
      },
      {
        q: 'Is delivery to Mysore free?',
        a: 'Yes, we offer free shipping on all orders to Mysore and across India.'
      },
      {
        q: 'Do you use real sandalwood?',
        a: 'We focus on our own farm-grown ingredients like neem and tulsi, as well as other traditional botanicals for our unique aromatic profiles.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'vadodara',
    displayName: 'Vadodara',
    state: 'Gujarat',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Vadodara via reliable courier partners. Every bar is crafted with intention.',
    faqs: [
      {
        q: 'Are the soaps made with real herbs?',
        a: 'Yes, we use real farm-grown botanicals like neem and tulsi in our soap batches to ensure an honest wash.'
      },
      {
        q: 'Is the packaging recyclable?',
        a: 'Yes, we prioritise minimal and recyclable packaging for all our orders to Vadodara.'
      },
      {
        q: 'Which base is best for daily use?',
        a: 'Our goat milk base is a versatile and popular choice for daily use, providing a creamy and gentle lather.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'visakhapatnam',
    displayName: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Visakhapatnam using reliable courier services. Every order is made to order.',
    faqs: [
      {
        q: 'How long does a bar of soap last in humidity?',
        a: 'To make your bar last longer in humid weather, we recommend using a well-draining soap dish and keeping it dry between uses.'
      },
      {
        q: 'Are these soaps genuinely SLS-free?',
        a: 'Yes, all our soaps are made without SLS or any other synthetic detergents, relying on natural saponification instead.'
      },
      {
        q: 'Can I get a custom selection of soaps?',
        a: 'Yes, you can browse our collection and curate your own selection of bars for delivery to Visakhapatnam.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'thane',
    displayName: 'Thane',
    state: 'Maharashtra',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Thane via trusted courier partners. Our small-batch process ensures high quality.',
    faqs: [
      {
        q: 'What is the shipping time to Thane?',
        a: 'Delivery to Thane typically takes 2 to 3 business days after dispatch from our Goa workshop. Tracking details will be shared.'
      },
      {
        q: 'Are the soaps suitable for sensitive skin?',
        a: 'Yes, our natural formulas are designed to be gentle and are suitable for those with sensitive skin types.'
      },
      {
        q: 'Do you offer cash on delivery in Thane?',
        a: 'Yes, we provide cash on delivery options for our customers in Thane for a convenient ordering experience.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'nashik',
    displayName: 'Nashik',
    state: 'Maharashtra',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Nashik using reliable courier services. Each order is crafted with care.',
    faqs: [
      {
        q: 'Do you use real orange oil in your soap?',
        a: 'Yes, our orange-based bars use natural citrus oil to provide a bright and fresh aromatic profile.'
      },
      {
        q: 'Is the soap made in small batches?',
        a: 'Yes, every bar of Healing Soil soap is made in small batches in Goa to ensure the highest standards of quality.'
      },
      {
        q: 'Are there any synthetic fragrances used?',
        a: 'No, we use only natural essential oils and botanicals to provide our bars with their unique and gentle scents.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'rajkot',
    displayName: 'Rajkot',
    state: 'Gujarat',
    deliveryNote: 'We ship handmade soap from our workshop in South Goa to Rajkot via trusted courier partners. Our soaps represent honest personal care.',
    faqs: [
      {
        q: 'Is shipping to Rajkot free?',
        a: 'Yes, we offer free shipping on all orders to Rajkot and across India, with no minimum order value.'
      },
      {
        q: 'What bases do you use for your soap?',
        a: 'We offer goat milk, glycerin, and shea butter bases, all of which are genuinely SLS-free and made without parabens.'
      },
      {
        q: 'How can I track my order to Rajkot?',
        a: 'We will share a tracking link with you once your order is dispatched from our workshop in Goa.'
      }
    ],
    publishedAt: null
  },
]
