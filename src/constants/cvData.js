/** Nội dung CV — viết cho nhà tuyển dụng, ngắn gọn dễ hiểu */
export const CV_PDF_URL = '/CV/17d61b03a13134a5f3bdf97e017b3126.pdf';

export const cvData = {
  name: 'Đỗ Trọng Tấn',
  title: 'Fullstack Developer',
  location: 'Hà Nội, Việt Nam',
  lastUpdated: 'Tháng 3/2026',
  contact: {
    phone: '0969846563',
    email: 'dotrongtan113@gmail.com',
    linkedin: 'https://linkedin.com/in/dotrongtan113',
    github: 'https://github.com/dotrongtan113',
  },
  overview: [
    'Có nhiều năm kinh nghiệm phát triển website, hệ thống bán hàng và phần mềm quản lý cho doanh nghiệp. Vừa trực tiếp làm sản phẩm, vừa dẫn dắt đội ngũ 5–8 người, phối hợp với khách hàng và bộ phận nghiệp vụ để triển khai đúng nhu cầu thực tế.',
    'Thế mạnh: website & cửa hàng online, tích hợp SAP / Shopify / Haravan / Nhanh.vn, hệ thống POS bán lẻ, tự động hóa quy trình nội bộ. Luôn ưu tiên giải pháp ổn định, dễ vận hành và mang lại giá trị rõ ràng cho doanh nghiệp.',
  ],
  experience: {
    company: 'FOXAI',
    role: 'Technical Lead',
    period: '08/2023 — Hiện tại',
    allocation: 'Phụ trách phát triển sản phẩm và điều phối đội ngũ kỹ thuật',
    leadership: [
      {
        title: 'Dẫn dắt đội ngũ',
        items: [
          'Quản lý team frontend & backend, phân công công việc và theo dõi tiến độ dự án.',
          'Hướng dẫn thành viên mới, xây dựng quy trình làm việc rõ ràng, giúp team phát triển năng lực.',
          'Làm cầu nối giữa kỹ thuật — kinh doanh — khách hàng, đảm bảo yêu cầu được hiểu đúng và bàn giao đúng hạn.',
        ],
      },
      {
        title: 'Chuẩn hóa quy trình làm việc',
        items: [
          'Xây dựng khung dự án dùng chung cho frontend và backend, giúp team bắt đầu nhanh và làm việc thống nhất.',
          'Thiết lập quy chuẩn code, tài liệu hướng dẫn và quy trình review trước khi đưa lên production.',
          'Triển khai tự động hóa build & deploy, rút ngắn thời gian phát hành phiên bản mới.',
        ],
      },
      {
        title: 'Tư vấn & triển khai giải pháp',
        items: [
          'Tham gia tư vấn giải pháp kỹ thuật cho dự án mua sắm, bán lẻ và thương mại điện tử.',
          'Đề xuất hướng triển khai phù hợp ngân sách, thời gian và quy mô vận hành của doanh nghiệp.',
          'Theo dõi chất lượng sản phẩm sau bàn giao, xử lý vấn đề phát sinh và cải tiến liên tục.',
        ],
      },
    ],
  },
  projects: [
    {
      name: 'Hệ thống mua sắm tập trung',
      goal: 'Giúp doanh nghiệp quản lý và phê duyệt đơn mua hàng trên một nền tảng, đồng bộ với SAP.',
      highlights: [
        'Thiết kế và triển khai toàn bộ luồng từ lập kế hoạch, phê duyệt đến đặt hàng.',
        'Kết nối dữ liệu với SAP B1, giảm thao tác thủ công và hạn chế sai sót khi xử lý đơn.',
        'Hệ thống vận hành ổn định, phục vụ khối lượng đơn hàng lớn hàng tháng.',
      ],
      stack: 'NestJS · SAP B1 · MySQL',
      role: 'Phụ trách kiến trúc hệ thống và điều phối team backend',
    },
    {
      name: 'Hệ thống POS bán lẻ',
      goal: 'Hỗ trợ chuỗi cửa hàng bán hàng, quản lý tồn kho và doanh thu trên nhiều chi nhánh.',
      highlights: [
        'Xây dựng giao diện bán hàng dễ dùng trên màn hình cảm ứng tại quầy.',
        'Kết nối máy in, máy quét mã vạch và đồng bộ dữ liệu giữa các cửa hàng.',
        'Triển khai thành công cho hơn 25 điểm bán trên toàn quốc, vận hành ổn định.',
      ],
      stack: 'Vue.js · Node.js · MySQL',
      role: 'Tech Lead — phụ trách chất lượng sản phẩm và hướng dẫn team frontend',
    },
    {
      name: 'Website thương mại điện tử',
      goal: 'Xây dựng cửa hàng online nhanh, mượt, tích hợp thanh toán và vận chuyển.',
      highlights: [
        'Phát triển website bán hàng hiện đại, tối ưu tốc độ tải và trải nghiệm người dùng.',
        'Tích hợp thanh toán VNPAY và đơn vị vận chuyển GHTK.',
        'Kết nối với nền tảng Shopify, giúp doanh nghiệp quản lý sản phẩm và đơn hàng thuận tiện.',
      ],
      stack: 'Next.js · MedusaJS · Shopify · VNPAY',
      role: 'Technical Lead — phụ trách triển khai và kiểm soát chất lượng',
    },
  ],
  skills: [
    {
      group: 'Phát triển web & ứng dụng',
      items: ['Vue.js', 'React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Laravel'],
    },
    {
      group: 'Thương mại điện tử',
      items: ['Shopify', 'Haravan', 'WooCommerce', 'MedusaJS', 'VNPAY', 'GHTK', 'GHN'],
    },
    {
      group: 'Hệ thống doanh nghiệp',
      items: ['SAP B1', 'Nhanh.vn', 'POS bán lẻ', 'Tích hợp API', 'Tự động hóa quy trình'],
    },
    {
      group: 'Vận hành & triển khai',
      items: ['Quản lý team', 'Agile', 'Docker', 'CI/CD', 'Tài liệu hóa dự án', 'Linux / AWS'],
    },
  ],
  education: {
    school: 'Trường Đại học Công nghiệp Thái Nguyên',
    degree: 'Kỹ sư Công nghệ Kỹ thuật Máy tính',
    period: '2018 — 2023',
    gpa: '3.2/4.0',
    coursework: 'Kỹ thuật phần mềm · Thiết kế CSDL · Phát triển web · Kiến trúc hệ thống',
  },
  award: {
    title: 'Nhân viên triển vọng của năm 2024 — FOXAI',
    description: 'Ghi nhận về chất lượng công việc, khả năng dẫn dắt team và đóng góc tích cực cho các dự án của công ty.',
  },
  interests: [
    'Bóng đá — tinh thần đồng đội',
    'Công nghệ & học hỏi liên tục',
    'Tối ưu quy trình và giải quyết vấn đề',
  ],
};
