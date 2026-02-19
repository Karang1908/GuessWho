/**
 * backgroundConfig.ts
 * 
 * Use this file to map category and subcategory IDs to background images.
 * You can use local paths (e.g., '/backgrounds/my-image.jpg') or URLs.
 * 
 * To add a background:
 * 1. Find the ID of the category or subcategory in constants.tsx.
 * 2. Add a new entry here with the ID as the key and the image path as the value.
 */

export const BACKGROUND_CONFIG: Record<string, string> = {
    // Special Views
    //'landing': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Abstract Liquid Glass
    'landing': 'https://images.unsplash.com/photo-1669780080364-515ad92d9911?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'category_select': 'https://t3.ftcdn.net/jpg/07/41/16/08/360_F_741160853_WVqCZhoZedRRRHj73uxS9EhRZuEBkfsa.jpg',
    //'shows': 'https://wallpapercave.com/wp/wp3135514.jpg',
    'shows': 'https://moewalls.com/wp-content/uploads/2024/06/watching-tv-adventure-time-thumb.jpg',

    // Categories
    //'marvel': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2670&auto=format&fit=crop', // Placeholder Marvel
    'marvel': 'https://wallpapercave.com/wp/wp8931656.jpg',
    'dc': 'https://wallpapercave.com/wp/wp14809367.webp', // Placeholder DC
    'disney': 'https://images.unsplash.com/photo-1524008279394-3aed4643b30b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //'harry-potter': 'https://images.unsplash.com/photo-1547756536-cde3f0c4a303?q=80&w=2676&auto=format&fit=crop',
    'anime': 'https://static0.cbrimages.com/wordpress/wp-content/uploads/2018/06/Best-Anime-on-Netflix.png?w=1200&h=628&fit=crop',

    //shows genres 
    's_crime_genre': 'https://www.shutterstock.com/image-illustration/graphicstyle-illustration-deep-red-black-600nw-2601144811.jpg',
    's_drama_genre': 'https://i.pinimg.com/736x/60/c7/af/60c7af66e292e758a6b07f15f05d5b5f.jpg',
    's_sitcom_genre': 'https://wallpapers.com/images/hd/friends-life-in-collage-t5igx6cezgu1gba6.jpg',
    's_romcom_genre': 'https://www.hollywoodreporter.com/wp-content/uploads/2022/09/NUP_198724_00019-H-2022.jpg?w=1296&h=730&crop=1',
    's_action_genre': 'https://cdn.wallpapersafari.com/64/21/fVxR8C.jpg',
    's_scifi_genre': 'https://wallpapersok.com/images/hd/sci-fi-wallpaper-p0ae7igxgxoodasn.jpg',



    // subcategories 

    // =================== SHOWS =================== \\

    //crime
    's_breaking_bad': 'https://wallpapers.com/images/hd/breaking-bad-series-cover-7lj0pi78smszhiqt.webp',
    's_you': 'https://images.alphacoders.com/130/thumb-1920-1305235.jpeg',
    's_money_heist': 'https://wallpapers.com/images/featured-full/money-heist-segtwbhffwy01w82.jpg',
    's_squidgames_genre': 'https://images6.alphacoders.com/119/thumb-1920-1191374.jpg',
    's_sopranos': 'https://images8.alphacoders.com/676/thumb-1920-676146.jpg',
    's_dexter': 'https://images.alphacoders.com/129/thumb-1920-1296363.jpg',

    // drama
    's_succession': 'https://images4.alphacoders.com/117/thumb-1920-1174630.jpg',
    's_euphoria': 'https://m.media-amazon.com/images/S/pv-target-images/0fa6184175601bb1558ec133b25b9fcc826882f4d5ab00321e51e7366b0a70dd.jpg',
    's_mr_robot': 'https://wallpapers.com/images/hd/mr-robot-minimalist-red-background-uvgyt9mootmnigm9.jpg',
    's_the_bear': 'https://images7.alphacoders.com/132/thumb-1920-1324794.jpeg',
    's_the_rookie': 'https://images8.alphacoders.com/132/thumb-1920-1321288.jpeg',
    's_the_good_doctor': 'https://images5.alphacoders.com/100/thumb-1920-1009723.jpg',
    's_house': 'https://picfiles.alphacoders.com/320/thumb-1920-320439.jpg',
    's_suits': 'https://images.alphacoders.com/796/thumb-1920-796473.jpg',
    's_supernatural': 'https://images4.alphacoders.com/132/thumb-1920-1323849.jpg',
    's_gossip_girl': 'https://picfiles.alphacoders.com/499/thumb-1920-499236.jpg',

    // sitcoms
    's_friends': 'https://wallpapercat.com/w/full/0/6/1/116776-1920x1080-desktop-1080p-friends-tv-series-wallpaper-photo.jpg',
    's_b99': 'https://c4.wallpaperflare.com/wallpaper/605/965/281/tv-show-brooklyn-nine-nine-wallpaper-preview.jpg',
    's_modern_family': 'https://wallpapercat.com/w/full/5/f/4/2204651-3840x2160-desktop-4k-modern-family-tv-series-background-image.jpg',
    's_young_sheldon': 'https://wallpapercave.com/wp/wp4092817.jpg',
    's_how_i_met_your_mother': 'https://images.alphacoders.com/485/485315.jpg',
    's_office': 'https://wallpapercat.com/w/full/2/1/c/172040-2880x1800-desktop-hd-the-office-tv-series-wallpaper.jpg',
    'gilmore_girls': 'https://wallpapers.com/images/featured/gilmore-girls-p9ovgeqo41gthg20.jpg',

    // rom com
    's_tsitp': 'https://images5.alphacoders.com/139/thumb-1920-1397373.jpg',
    's_bridgerton': 'https://images8.alphacoders.com/121/1216842.jpg',
    's_emily_in_paris': 'https://lilycollins.com/gallery/albums/uploads/TelevisionSeries/EmilyinParis/S3/Captures/309/ALC309-021.jpg',
    's_normal_people': 'https://www.irishtimes.com/resizer/v2/EB7NV3DHZRDTAX7I7KTWMZEC5Q.jpg?auth=52fffdb0f8f88641c805687fd6d5b89d5a5a2708ab6a6d1a1f3bacc9af981f29&smart=true&width=1600&height=900',
    's_tvd': 'https://wallpapercave.com/wp/zvfsuHC.jpg',
    's_lifewthewalterboys': 'https://assets.teenvogue.com/photos/68a747e3f61d7a068821bc3d/16:10/w_2560%2Cc_limit/HEADER_WALTERBOYSxMOMENT_TEENVOGUE_AUGUST2025.jpg',

    // action & adventure 
    's_stranger_things': 'https://wallpapers.com/images/hd/stranger-things-aesthetic-desktop-t4xq619lpbq8wxh8.jpg',
    's_the_boys': 'https://wallpapercat.com/w/full/1/9/a/16154-3840x2160-desktop-4k-the-boys-background.jpg',
    's_got': 'https://www.highreshdwallpapers.com/wp-content/uploads/2014/04/Game-of-Thrones-Season-1-HD-Background-1920x1080.jpg',
    's_the_last_of_us': 'https://wallpapercg.com/media/ts_orig/31341.webp',
    's_mandalorian': 'https://images8.alphacoders.com/110/1103710.jpg',
    's_reacher': 'https://images3.alphacoders.com/134/1345053.png',

    // sci-fi 
    's_black_mirror': 'https://wallpapers.com/images/featured/black-mirror-gbqux8n5pndwjdrn.jpg',
    's_x_files': 'https://images2.alphacoders.com/779/77982.jpg',
    's_severance': 'https://images4.alphacoders.com/130/1301272.jpg',
    's_dark': 'https://wallpapers.com/images/hd/dark-netflix-xm9ahykaozirq4em.jpg',
    's_westworld': 'https://images6.alphacoders.com/125/1250789.jpg',

    // =================== ANIME =================== \\

    'an_jjk': 'https://wallpaperaccess.com/full/5252278.jpg',
    'an_tokyo_ghoul': 'https://i.pinimg.com/originals/9e/07/fe/9e07fe5842ccad12c689fbf2dded4480.jpg',
    'an_chainsaw_man': 'https://wallpapers-clan.com/wp-content/uploads/2025/04/chainsaw-man-anime-power-desktop-wallpaper-cover.jpg',
    'an_one_piece': 'https://wallpapers-clan.com/wp-content/uploads/2024/07/luffy-floral-hat-one-piece-desktop-wallpaper-preview.jpg',
    'an_death_note': 'https://wallup.net/wp-content/uploads/2016/05/14/35798-Death_Note.jpg',
    'an_demon_slayer': 'https://wallpapers-clan.com/wp-content/uploads/2024/02/demon-slayer-tanjiro-unsheathing-the-sword-desktop-wallpaper-preview.jpg',
    'an_jojo': 'https://wallpapers-clan.com/wp-content/uploads/2024/06/jojos-bizarre-adventure-giorno-giovanna-pink-desktop-wallpaper-preview.jpg',
    'an_one_punch_man': 'https://wallpapers-clan.com/wp-content/uploads/2024/04/one-punch-man-saitama-epic-desktop-wallpaper-cover.jpg',
    'an_aot': 'https://wallpapercave.com/wp/wp1837539.jpg',
    'an_dragon_ball_z': 'https://wallpapers-clan.com/wp-content/uploads/2025/05/dragon-ball-z-goku-vs-cell-desktop-wallpaper-preview.jpg',
    'an_baki': 'https://images5.alphacoders.com/140/thumb-1920-1404910.jpg',
    'an_bleach': 'https://wallpapers-clan.com/wp-content/uploads/2025/08/ichigo-blood-moon-bleach-anime-desktop-wallpaper-cover.jpg',
    'an_tokyo_revengers': 'https://wallpapers.com/images/featured/tokyo-revengers-laptop-nigflp2a0wbi5hbl.jpg',
    'an_black_clover': 'https://wallpapers-clan.com/wp-content/uploads/2024/12/black-clover-asta-glowing-sword-desktop-wallpaper-preview.jpg',
    'an_solo_leveling': 'https://images.wallpapersden.com/image/download/solo-leveling-cool-amazing_bmVuZ2mUmZqaraWkpJRnZWltrWZlbmc.jpg',
    'an_my_hero_academia': 'https://wallpapers-clan.com/wp-content/uploads/2024/04/my-hero-academia-deku-dark-desktop-wallpaper-preview.jpg',
    'an_naruto': 'https://wallpapers-clan.com/wp-content/uploads/2024/07/naruto-sasuke-epic-battle-anime-desktop-wallpaper-preview.jpg',
    'an_dr_stone': 'https://wallpapers-clan.com/wp-content/uploads/2024/02/dr-stone-senku-beige-desktop-wallpaper-preview.jpg',





    //'s_stranger_things': 'https://wallpapercave.com/wp/wp3135514.jpg',
    //'s_stranger_things': 'https://wallpapercave.com/wp/wp3135514.jpg',
};
