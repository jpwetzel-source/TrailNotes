/** @typedef {'mine' | 'community'} TripsFeed */
/** @typedef {'all' | 'alpine' | 'forests' | 'coastal'} TripCategory */

/**
 * @typedef {{
 *   id: string,
 *   feed: TripsFeed,
 *   category: Exclude<TripCategory, 'all'>,
 *   title: string,
 *   imageUrl: string,
 *   imageAlt: string,
 *   badge: string,
 *   dateLabel: string,
 *   duration: string,
 *   description: string,
 *   authorName?: string,
 *   authorAvatar?: string,
 *   postedAgo?: string,
 * }} TripCardModel */

/** @type {TripCardModel[]} */
export const MOCK_MY_TRIPS = [
  {
    id: "my-1",
    feed: "mine",
    category: "alpine",
    title: "High Sierra Loop",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCe_D2_NTW-isPf0mvjiECO0zjsn38Rp3jdDfGE04FEJLL8BvcBShQexyCATSKcrqs20jPWvuiWRQbENM2t5byap3jT8pOcDyl6y1TjUP4K0Q9G1_0zm9NuJizEWMdDFtyQO073BeU7nfFdT7JYKeGYDQjmfstp26SGvoA3qToxp0u0Xxr-2L-VwoRDf3R2uKOfpbsC8BdBL57JFVfsxF3pgBeztNt2EeQDFHIJEwvGX6OdEFCvVLFrIqVvlx9UMmrOpBQaZUf3XX0",
    imageAlt: "Mountain view",
    badge: "Completed",
    dateLabel: "Oct 12, 2023",
    duration: "6h 45m",
    description:
      "An alpine journey through the heart of the Sierra Nevada. Witnessed a breathtaking sunrise over the glacial lake near the summit.",
  },
  {
    id: "my-2",
    feed: "mine",
    category: "forests",
    title: "Emerald Forest Path",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLvfjHCxUtlhkywOG4KC_G3lYLw_F0tg3zsbhuyMInS7fIh4ZZu7BBKWrSA2SP6DfzfbIe5dvsbmWS308l5V36UxDeo5m3__EU1ZxpoZeIjniCn6b4hm1CR9oWqgyFojbBw_AfOYLNMRUc4wc8MeLADyhaHySCAR1MKcCvWPWJvoQ21OYFvmjGLqILYto68Jas1elBiRFSLreG5ZOkbYllLo-WY-BGy91of0vIap9qWpM_sJyYKYASqpQZzfJkXVl-Qe2JTjMMhhg",
    imageAlt: "Forest path",
    badge: "Completed",
    dateLabel: "Sep 28, 2023",
    duration: "3h 20m",
    description:
      "A peaceful wander through ancient ferns and towering redwoods. The air was thick with the scent of damp earth and pine needles.",
  },
  {
    id: "my-3",
    feed: "mine",
    category: "coastal",
    title: "Pacific Rim Trail",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB61-viXAgSCAoS72vduxBql_72_6YRiP7MSSCcnHNlzuoorIMe16MOe1DKSRSYeLnsQ7Qkc3UUdNJJfivE82F6X0lirGfUiH706FfU3RON1PAoAkTZ7x01rwEvjXfhq8pUSVEW6J__g_ve79Kwb0EiBxg_IDry8L_uO3aLlBnk1PAAwF0M4uV8TIl0UWrfNK8h-RGuB7ZBpv087b3XSiyHCiLRHuCpM1H1eHrlnGo_y4dPKa8KYaDf1eu2EAPDL_3U6PuUrN2aF1Y",
    imageAlt: "Coastal cliff",
    badge: "Completed",
    dateLabel: "Sep 04, 2023",
    duration: "5h 10m",
    description:
      "Dramatic coastal views and steady sea breezes. Spotted a pod of whales migrating south near the halfway point lookout.",
  },
];

/** @type {TripCardModel[]} */
export const MOCK_COMMUNITY_TRIPS = [
  {
    id: "co-1",
    feed: "community",
    category: "alpine",
    title: "Tarn Shelf Loop",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcY9g9VjGjgjuFAaldkG1wjKE4JTzV_iRrXdCoYIxkdyD5SBfhHi-SA8dJcQty4rtKV1UZ3aC4KTZXTfnEs8nf49eFMYgJdUE0LCxkHdgipYO9NqxC1pPInjIJ-mFpOYchXZdu2y8t5Vl5meb5VTg-3Iw4q9jC606_ykkLTUOBxv5iJQ_WZU06zDyuDOmvb4n8q0sfqIr474SDvhfUg-UD_45HL2CCQ5z8ZDMA4r6QZoKL-CBSOFFETbJIl7EAck6ByybP4r_0X_s",
    imageAlt: "Alpine ridge",
    badge: "Completed",
    dateLabel: "Apr 14, 2026",
    duration: "4h 12m",
    description:
      "The alpine lakes were crystal clear today. Steep ascent but the view from the top is unbeatable.",
    authorName: "Elena Vance",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAmXwfh1HwfShu1wi-G4Z0uokhkQ66u7ec7NtXmpyjtwMYcRhppeHtEGKIL2HOeEZmYsETymGg34T328rnAuaO5_0yA-dhsE0_SGWwHmLe7zMO6VRnWsDSR4tlrVRy_EVEHYpaZF_RpB-gcxIk_mBXUjQrVOYCvic3PczHcpi06b5kzrKlKGggbCKdT0FCoP-0t7ZyQlBKbaY7YgLIY-cwalsFii9romlcxyQhcXgfB39vkmVI9OetYjb76EgPd9c8zSzKR_lucsQ",
    postedAgo: "2d ago",
  },
  {
    id: "co-2",
    feed: "community",
    category: "forests",
    title: "Emerald Valley",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLvfjHCxUtlhkywOG4KC_G3lYLw_F0tg3zsbhuyMInS7fIh4ZZu7BBKWrSA2SP6DfzfbIe5dvsbmWS308l5V36UxDeo5m3__EU1ZxpoZeIjniCn6b4hm1CR9oWqgyFojbBw_AfOYLNMRUc4wc8MeLADyhaHySCAR1MKcCvWPWJvoQ21OYFvmjGLqILYto68Jas1elBiRFSLreG5ZOkbYllLo-WY-BGy91of0vIap9qWpM_sJyYKYASqpQZzfJkXVl-Qe2JTjMMhhg",
    imageAlt: "Forest valley",
    badge: "Completed",
    dateLabel: "Apr 12, 2026",
    duration: "2h 05m",
    description:
      "Quiet morning walk through the ferns. Trail is a bit muddy after last night's rain.",
    authorName: "Marcus Thorne",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjSlR80TbfgT8FNKRt7ApnZVgbUPQYWqfQ8X5m-q8ddSBQFCmrav6eV6rjczEZwaoTxDwBKD5jb35Ipd_hL1PmmWj1y9fFbmZxgCqbiN4Q2_5Si5yd70rOZVhsh6DorLq_jUDrpRK2Rs7UgA6Z-0t42KXJKF1UCSwd-Tc0Pab-U6XC7MgzsSjS0Q5XwOg2IoK8-9ipmojyBLm-D8glERfKoqn3O8lCMyJWf1gq9T9bdvWXi_Xy0F5uMMzjOitoW8tjr0-lak9DURg",
    postedAgo: "4d ago",
  },
  {
    id: "co-3",
    feed: "community",
    category: "alpine",
    title: "Seceda Ridgeline",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcY9g9VjGjgjuFAaldkG1wjKE4JTzV_iRrXdCoYIxkdyD5SBfhHi-SA8dJcQty4rtKV1UZ3aC4KTZXTfnEs8nf49eFMYgJdUE0LCxkHdgipYO9NqxC1pPInjIJ-mFpOYchXZdu2y8t5Vl5meb5VTg-3Iw4q9jC606_ykkLTUOBxv5iJQ_WZU06zDyuDOmvb4n8q0sfqIr474SDvhfUg-UD_45HL2CCQ5z8ZDMA4r6QZoKL-CBSOFFETbJIl7EAck6ByybP4r_0X_s",
    imageAlt: "Dolomites ridgeline",
    badge: "Completed",
    dateLabel: "Apr 08, 2026",
    duration: "5h 30m",
    description:
      "Ridgeline miles with the group. Wind picked up after noon but the light on the peaks was worth it.",
    authorName: "Sam Okonkwo",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRmrhfObH-LkrQzLP_NOZMZNafRHQRdw8BPpAuwkuPPmP0-I1dNNUS7ga9DTVxV-wKWNvKzl4WVg3Yu06Mms71uwVoy907QPOsgHsRGoFOnWG-BCf1ElVahyYrMAPguSMF6qqZai6t5UNCZIBbRYcDcbp3tPD6BXrCheYVpwvMdlI1TlQLOcRbyBL4pcInM0RUvmhKlqMMYW-g5hPd0FguD4rSh9U7n8DhDZdanSgDECcibmLXwz4vuXcdIsF-xZw6b21W0Fpn8X0",
    postedAgo: "1w ago",
  },
  {
    id: "co-4",
    feed: "community",
    category: "coastal",
    title: "Cape Bluff at dawn",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB61-viXAgSCAoS72vduxBql_72_6YRiP7MSSCcnHNlzuoorIMe16MOe1DKSRSYeLnsQ7Qkc3UUdNJJfivE82F6X0lirGfUiH706FfU3RON1PAoAkTZ7x01rwEvjXfhq8pUSVEW6J__g_ve79Kwb0EiBxg_IDry8L_uO3aLlBnk1PAAwF0M4uV8TIl0UWrfNK8h-RGuB7ZBpv087b3XSiyHCiLRHuCpM1H1eHrlnGo_y4dPKa8KYaDf1eu2EAPDL_3U6PuUrN2aF1Y",
    imageAlt: "Coastal bluff at sunrise",
    badge: "Planned",
    dateLabel: "Apr 22, 2026",
    duration: "3h 00m",
    description:
      "Planning an early start for tide pools and coffee on the bluff. Anyone welcome to join the first shuttle.",
    authorName: "Jordan Lee",
    authorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhOEpq8_3fsT43yxbgik5uCnKvJqFP-t7CFx7BSwt6qtXsm81q551GnnxgEvBQ2JodKpGsGEDqKQBPtkzdiUpvUYn8DmJJu6CpXIAedBCvnBnJpvSciVX8Z0LVZwiCCKW-0g2I-eZa4jiD-MFlk66YWxp84_BHvQ5DNOAOu4iV7OfVsIsaDp3VtwXTn4bP-m9JCTWsvQ4xgLMPSoLbt3gWWnGBYiXCLRWvgPC-doot-t4Rwp2GTN9phgvbUX8bMS5_e8mh_ERsz4Y",
    postedAgo: "Planned",
  },
];
