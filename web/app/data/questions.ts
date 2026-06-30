export interface Question {
  id: string
  question: string
  hint: string
  multi: boolean
  options: string[]
}

export const questions: Question[] = [
  {
    id: 'vibes',
    question: "What's your style vibe?",
    hint: 'Pick all that apply',
    multi: true,
    options: [
      'Feminine & flirty',
      'Elegant & classic',
      'Boho & relaxed',
      'Bold & edgy',
      'Sporty & casual',
      'Minimalist & clean',
      'Streetwear & urban',
      'All of the above',
    ],
  },
  {
    id: 'colors',
    question: "What's your color palette?",
    hint: 'Pick all that apply',
    multi: true,
    options: [
      'Neutrals & nudes',
      'Pastels & soft tones',
      'Earthy & warm tones',
      'Black & monochrome',
      'Bright & bold',
      'Cool blues & greens',
      'Jewel tones',
      'Prints & patterns',
      'All of the above',
    ],
  },
  {
    id: 'shops',
    question: 'What do you shop for most?',
    hint: 'Pick all that apply',
    multi: true,
    options: [
      'Dresses & skirts',
      'Tops & blouses',
      'Pants & jeans',
      'Shorts & joggers',
      'Suits & blazers',
      'Lingerie & intimates',
      'Shoes & heels',
      'Sneakers & boots',
      'Accessories',
      'Outerwear',
      'Activewear',
      'All of the above',
    ],
  },
  {
    id: 'layers',
    question: 'How do you feel about layering?',
    hint: 'Pick one',
    multi: false,
    options: [
      'Love layering',
      'Occasionally',
      'Keep it simple',
      'No layers — I run hot',
    ],
  },
  {
    id: 'fabrics',
    question: 'What fabrics do you love?',
    hint: 'Pick all that apply',
    multi: true,
    options: [
      'Soft cotton',
      'Silky & satin',
      'Stretchy jersey',
      'Lace & mesh',
      'Linen & breathable',
      'Denim',
      'Velvet & plush',
      'No stiff or coarse fabrics',
      'All of the above',
    ],
  },
  {
    id: 'fit',
    question: 'Any fit or body needs?',
    hint: 'Pick all that apply — skip any that don\'t apply',
    multi: true,
    options: [
      "Tall 5'9\"+",
      "Petite under 5'4\"",
      'Plus & curve',
      'Athletic build',
      'Broader shoulders',
      'Shorter torso',
      'Narrow feet',
      'Wide feet',
      'Tuck-friendly styling',
      'Flat chest',
      'Larger bust',
      'None',
    ],
  },
  {
    id: 'budget',
    question: "What's your budget per item?",
    hint: 'Pick one',
    multi: false,
    options: ['Under $30', '$30–$80', '$80–$200', '$200+', 'Depends'],
  },
]
