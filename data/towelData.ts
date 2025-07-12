
export interface TowelVariant {
  parentProduct: 'bathTowel' | 'bathMat';
  nameKey: string;
  specKey: string;
  suitabilityKey: string;
}

export interface TowelProduct {
  key: 'bathTowel' | 'bathMat';
  nameKey: string;
  descriptionKey: string;
  imageUrl: string;
  techTipKey: string;
  variants: TowelVariant[];
}

export const towelProducts: TowelProduct[] = [
  {
    key: 'bathTowel',
    nameKey: 'towelsPage.bathTowel.name',
    descriptionKey: 'towelsPage.bathTowel.description',
    imageUrl: 'https://i.postimg.cc/GpRX4qcP/towel0001.jpg',
    techTipKey: 'towelsPage.bathTowel.techTip',
    variants: [
      { parentProduct: 'bathTowel', nameKey: 'towelsPage.bathTowel.variant1_name', specKey: 'towelsPage.bathTowel.variant1_spec', suitabilityKey: 'towelsPage.bathTowel.variant1_suitability' },
      { parentProduct: 'bathTowel', nameKey: 'towelsPage.bathTowel.variant2_name', specKey: 'towelsPage.bathTowel.variant2_spec', suitabilityKey: 'towelsPage.bathTowel.variant2_suitability' },
      { parentProduct: 'bathTowel', nameKey: 'towelsPage.bathTowel.variant3_name', specKey: 'towelsPage.bathTowel.variant3_spec', suitabilityKey: 'towelsPage.bathTowel.variant3_suitability' },
      { parentProduct: 'bathTowel', nameKey: 'towelsPage.bathTowel.variant4_name', specKey: 'towelsPage.bathTowel.variant4_spec', suitabilityKey: 'towelsPage.bathTowel.variant4_suitability' },
    ]
  },
  {
    key: 'bathMat',
    nameKey: 'towelsPage.bathMat.name',
    descriptionKey: 'towelsPage.bathMat.description',
    imageUrl: 'https://i.postimg.cc/V6pFvXGC/hotel-bath-matt.jpg',
    techTipKey: 'towelsPage.bathMat.techTip',
    variants: [
      { parentProduct: 'bathMat', nameKey: 'towelsPage.bathMat.variant1_name', specKey: 'towelsPage.bathMat.variant1_spec', suitabilityKey: 'towelsPage.bathMat.variant1_suitability' },
    ]
  }
];
