import { BuddhistWisdom } from '@/types/journal';

// Sample Buddhist quotes
const BUDDHIST_QUOTES = {
  peaceful: [
    {
      quote: "Không có con đường đến hòa bình, hòa bình chính là con đường.",
      author: "Thích Nhất Hạnh",
      reflection: "Hòa bình không phải là điểm đến mà chính là cách chúng ta đi. Hãy sống từng khoảnh khắc một cách an lành và tỉnh thức.",
      context: "Trích từ tư tưởng của Thiền sư Thích Nhất Hạnh về sự thực hành chánh niệm trong đời sống hàng ngày.",
      source: "Thích Nhất Hạnh",
      sourceLink: "https://plumvillage.org/thich-nhat-hanh/key-teachings/"
    },
    {
      quote: "Hãy là hòn đảo của chính mình, hãy là nơi nương tựa của chính mình, không tìm kiếm nơi nương tựa bên ngoài.",
      author: "Đức Phật",
      reflection: "Sự bình yên thực sự đến từ bên trong. Khi bạn tìm thấy sự an tĩnh trong chính mình, không gì bên ngoài có thể làm bạn xao động.",
      context: "Lời dạy này xuất phát từ kinh Đại Bát-niết-bàn, khuyên các đệ tử nên nương tựa vào chính mình và Giáo Pháp.",
      source: "Kinh Đại Bát-niết-bàn",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/dn/dn.16.1-6.vaji.html"
    },
    // ... other peaceful quotes
  ],
  happy: [
    {
      quote: "Hạnh phúc không phải là có nhiều, mà là ít ham muốn.",
      author: "Đức Phật",
      reflection: "Khi chúng ta giảm bớt tham muốn, chúng ta tìm thấy sự mãn nguyện trong những điều đơn giản. Đó là chìa khóa của hạnh phúc thực sự.",
      context: "Lời dạy này được tìm thấy trong nhiều kinh điển Phật giáo, nhấn mạnh rằng hạnh phúc đến từ sự biết đủ (tri túc).",
      source: "Kinh Pháp Cú",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/kn/dhp/dhp.15.than.html"
    },
    {
      quote: "Giống như bông hoa tươi đẹp, có sắc hương nhưng không có chất độc, là lời nói của người thuần thiện.",
      author: "Đức Phật",
      reflection: "Lời nói thiện lành mang lại niềm vui cho người nghe và người nói. Hãy chọn những lời nói khiến mọi người hạnh phúc.",
      context: "Trích từ Kinh Pháp Cú, phẩm Hoa, so sánh lời nói thiện với bông hoa đẹp đẽ và thơm ngát.",
      source: "Kinh Pháp Cú, kệ 52",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/kn/dhp/dhp.04.than.html"
    },
    // ... other happy quotes
  ],
  neutral: [
    {
      quote: "Đừng dính mắc vào quá khứ, đừng mơ tưởng về tương lai, hãy sống trọn vẹn với hiện tại.",
      author: "Đức Phật",
      reflection: "Khi chúng ta tập trung vào hiện tại, chúng ta thoát khỏi những hối tiếc về quá khứ và lo âu về tương lai. Chỉ khi đó, chúng ta mới thực sự sống.",
      context: "Đây là lời dạy cốt lõi về chánh niệm trong Phật giáo, nhấn mạnh tầm quan trọng của việc sống trong hiện tại.",
      source: "Bhaddekaratta Sutta (Kinh Nhất Dạ Hiền Giả)",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/mn/mn.131.than.html"
    },
    {
      quote: "Khi tâm không loạn động, đó là con đường tốt nhất để đạt được hạnh phúc.",
      author: "Đức Phật",
      reflection: "Tâm bình lặng như mặt hồ không gợn sóng có thể phản chiếu thực tại một cách rõ ràng. Hãy tìm sự tĩnh lặng trong tâm hồn.",
      context: "Lời dạy này nhấn mạnh tầm quan trọng của việc giữ tâm tĩnh lặng và ổn định trong mọi hoàn cảnh.",
      source: "Kinh Pháp Cú",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/kn/dhp/dhp.intro.budd.html"
    },
    // ... other neutral quotes
  ],
  sad: [
    {
      quote: "Nỗi buồn không tồn tại trong sự việc, mà trong cách chúng ta nhìn nhận sự việc.",
      author: "Đức Phật",
      reflection: "Khi thay đổi cách nhìn, chúng ta có thể thấy nỗi buồn chỉ là một trạng thái tâm tạm thời. Mọi sự đều thay đổi, kể cả nỗi buồn.",
      context: "Phật dạy rằng khổ đau là do chấp thủ và tham ái. Khi thay đổi cách nhìn về thực tại, khổ đau sẽ giảm đi.",
      source: "Kinh Chuyển Pháp Luân",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/sn/sn56/sn56.011.than.html"
    },
    {
      quote: "Cũng như cơn mưa không thể xuyên qua mái nhà khéo lợp, tham dục không thể xuyên qua tâm khéo tu tập.",
      author: "Đức Phật",
      reflection: "Khi tâm được rèn luyện qua thiền định và chánh niệm, nỗi buồn và đau khổ không thể dễ dàng xâm nhập. Hãy xây dựng một tâm hồn vững chãi.",
      context: "Ẩn dụ này từ Kinh Pháp Cú, so sánh tâm được tu tập tốt như một ngôi nhà có mái che chắn chắn, không bị ảnh hưởng bởi mưa gió.",
      source: "Kinh Pháp Cú, kệ 14",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/kn/dhp/dhp.01.than.html"
    },
    // ... other sad quotes
  ],
  anxious: [
    {
      quote: "Lo lắng không làm vơi đi nỗi đau của ngày mai, nhưng nó lấy đi sự bình yên của ngày hôm nay.",
      author: "Đức Phật",
      reflection: "Lo lắng về tương lai không thể thay đổi những gì sẽ đến, nhưng chắc chắn sẽ phá hủy niềm vui hiện tại. Hãy sống trong hiện tại.",
      context: "Lời dạy này nhắc nhở chúng ta rằng lo lắng chỉ làm tăng thêm khổ đau, không giải quyết được vấn đề sắp tới.",
      source: "Tương truyền từ lời dạy của Đức Phật",
      sourceLink: "https://www.accesstoinsight.org/index.html"
    },
    {
      quote: "Khi bạn đã hoàn toàn hiểu rằng mọi thứ đều vô thường, bạn sẽ không lo lắng về bất cứ điều gì.",
      author: "Đức Phật",
      reflection: "Hiểu được tính vô thường của vạn vật giúp chúng ta buông bỏ sự lo lắng. Không có gì tồn tại mãi mãi, kể cả những khó khăn hiện tại.",
      context: "Đây là lời dạy về vô thường (anicca), một trong ba đặc tính của tồn tại theo Phật giáo, giúp chúng ta đối mặt với sự thay đổi.",
      source: "Tăng Chi Bộ Kinh",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/an/index.html"
    },
    // ... other anxious quotes
  ],
  confusion: [
    {
      quote: "Trong tâm trí đầy hoang mang, chúng ta tìm thấy người thầy tốt nhất.",
      author: "Thích Nhất Hạnh",
      reflection: "Sự hoang mang và không chắc chắn có thể dẫn đến những câu hỏi sâu sắc và cuối cùng là sự hiểu biết thực sự. Hãy đón nhận nó như một phần của hành trình.",
      context: "Thích Nhất Hạnh dạy rằng những cảm xúc khó khăn như hoang mang không phải là kẻ thù mà là người thầy, giúp chúng ta phát triển.",
      source: "Thích Nhất Hạnh",
      sourceLink: "https://plumvillage.org/about/thich-nhat-hanh/"
    },
    {
      quote: "Đừng tin vào điều gì chỉ vì bạn đã nghe. Đừng tin vào truyền thống vì nó đã được truyền từ xa xưa.",
      author: "Đức Phật",
      reflection: "Khi bạn cảm thấy hoang mang, hãy tin vào kinh nghiệm cá nhân và sự hiểu biết của chính mình. Hãy kiểm chứng và trải nghiệm trước khi chấp nhận.",
      context: "Trích từ Kinh Kalama, một lời khuyên nổi tiếng của Đức Phật về tư duy phản biện và không chấp nhận điều gì một cách mù quáng.",
      source: "Kinh Kalama",
      sourceLink: "https://www.accesstoinsight.org/tipitaka/an/an03/an03.065.than.html"
    },
    // ... other quotes for confusion
  ],
};

export const generateBuddhistWisdom = (intentOrEmotion: string): BuddhistWisdom => {
  let quotes = BUDDHIST_QUOTES.peaceful; // Default to peaceful quotes
  
  // Map intent to emotional state
  if (intentOrEmotion === 'calm' || intentOrEmotion === 'peaceful') {
    quotes = BUDDHIST_QUOTES.peaceful;
  } else if (intentOrEmotion === 'insight' || intentOrEmotion === 'happy') {
    quotes = BUDDHIST_QUOTES.happy;
  } else if (intentOrEmotion === 'gratitude' || intentOrEmotion === 'neutral') {
    quotes = BUDDHIST_QUOTES.neutral;
  } else if (intentOrEmotion === 'confusion' || intentOrEmotion === 'sad') {
    quotes = BUDDHIST_QUOTES.sad;
  } else if (intentOrEmotion === 'anxious') {
    quotes = BUDDHIST_QUOTES.anxious;
  }
  
  // Pick a random quote from the selected category
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return {
    ...randomQuote
  };
};
