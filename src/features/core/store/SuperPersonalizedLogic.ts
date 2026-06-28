import { useMemo } from 'react';
import { RelationshipType, GenderType } from './useBirthdayStore';

export const getHighlySpecificLetter = (
  name: string,
  relationship: RelationshipType,
  gender: GenderType,
  interests: string[] = []
) => {
  const isFemale = gender === 'female';
  const isMale = gender === 'male';

  // 1. Partner Case
  if (relationship === 'partner') {
    return isFemale 
      ? `My dearest ${name},\n\nYou are the light of my life and the beat of my heart. Every moment with you is a treasure I hold close. Today, I celebrate not just your birthday, but the incredible person you are—the one who makes my world brighter just by being in it.\n\nHappy Birthday, my love. 💖`
      : `My dear ${name},\n\nYou are my rock, my partner, and my best friend. Your strength and kindness inspire me every single day. I'm so grateful to have you by my side through all of life's adventures.\n\nHappy Birthday, my love. 💙`;
  }

  // 2. Friend Case (with gender-specific nuances)
  if (relationship === 'friend') {
    if (isMale) {
      return `Hey ${name},\n\nYou're not just a friend—you're a legend. Thanks for always being there, for the laughs, the adventures, and for being the kind of person everyone can count on. The world is better with you in it.\n\nHappy Birthday, brother! 🚀`;
    }
    return `Hey ${name},\n\nYou're the kind of friend everyone wishes for. Thank you for the memories, the support, and for always being real. Here's to many more years of friendship and unforgettable moments.\n\nHappy Birthday, bestie! ✨`;
  }

  // 3. Family (Default Fallback)
  return `Dear Umer,\n\n Thank you for being there whenever I needed you most, both in good times and bad times. You helped me realize that I should love myself the way I deserve. I still wonder how a person can care the way you do. I don't think any of my friends would understand me or care for me the way you do. You've raised the bar, man!❤️.\n\nHappy Birthday! 🎂`;
};

export const getInterestBasedTheme = (interests: string[]) => {
  const lowerInterests = interests.map(i => i.toLowerCase().trim());
  
  if (lowerInterests.includes('car')) return 'automotive';
  if (lowerInterests.includes('music')) return 'melodic';
  if (lowerInterests.includes('coding')) return 'matrix';
  if (lowerInterests.includes('gaming')) return 'pixel';
  
  return 'classic';
};

export const getBigWishes = (name: string, relationship: RelationshipType, gender: GenderType, interests: string[] = []) => {
  const wishes = [
    { emoji: "🚀", wish: `May your ${name} brand reach new galaxies this year!` },
    { emoji: "💎", wish: `You are a diamond in the rough, ${name}. Stay precious.` }
  ];

  if (relationship === 'partner') {
    wishes.push(
      { emoji: "❤️", wish: `Every heartbeat of mine is a wish for your happiness, ${name}.` },
      { emoji: "💍", wish: `To many more years of us making the world jealous of our love.` }
    );
  } else if (relationship === 'friend') {
    wishes.push(
      { emoji: "🔥", wish: `Stay legendary, stay wild, and keep breaking the internet, ${name}!` },
      { emoji: "🍻", wish: `To the nights we won't remember and the friend I'll never forget.` }
    );
  }

  if (interests.some(i => i.toLowerCase().includes('car'))) {
    wishes.push({ emoji: "🏎️", wish: `May your life accelerate from 0 to 100 in pure happiness this year!` });
  }

  if (interests.some(i => i.toLowerCase().includes('coding'))) {
    wishes.push({ emoji: "💻", wish: `May your life have zero bugs and infinite features, ${name}!` });
  }

  return wishes;
};
