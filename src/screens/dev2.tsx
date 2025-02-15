const fakeExpenses1= [
  {
    "amount": 500000,
    "wallet": "Wallet number 1",
    "partner": "Nguyễn Văn A",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua quần áo mùa đông",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-02T14:23:00Z"
  },
  {
    "amount": 200000,
    "wallet": "Wallet number 2",
    "partner": "Trần Thị B",
    "type": "Nhận",
    "category": "Giải trí",
    "description": "Chia tiền xem phim",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-05T10:15:00Z"
  },
  {
    "amount": 150000,
    "wallet": "Wallet number 3",
    "partner": "Cửa hàng tiện lợi",
    "type": "Gửi",
    "category": "Khác",
    "description": "Mua đồ dùng cá nhân",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-08T08:45:00Z"
  },
  {
    "amount": 75000,
    "wallet": "Wallet number 1",
    "partner": "Nguyễn Văn C",
    "type": "Nhận",
    "category": "Di chuyển",
    "description": "Chia tiền taxi",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-10T12:30:00Z"
  },
  {
    "amount": 120000,
    "wallet": "Wallet number 2",
    "partner": "Phạm Thị D",
    "type": "Gửi",
    "category": "Sức khỏe",
    "description": "Mua thuốc cảm cúm",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-12T16:00:00Z"
  },
  {
    "amount": 350000,
    "wallet": "Wallet number 3",
    "partner": "Siêu thị XYZ",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua thực phẩm tuần",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-15T18:20:00Z"
  },
  {
    "amount": 90000,
    "wallet": "Wallet number 1",
    "partner": "Nhà hàng ABC",
    "type": "Nhận",
    "category": "Giải trí",
    "description": "Ăn tối cùng bạn bè",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-18T20:10:00Z"
  },
  {
    "amount": 50000,
    "wallet": "Wallet number 2",
    "partner": "GrabBike",
    "type": "Gửi",
    "category": "Di chuyển",
    "description": "Đi xe ôm về nhà",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-20T09:30:00Z"
  },
  {
    "amount": 250000,
    "wallet": "Wallet number 3",
    "partner": "Phòng tập Gym",
    "type": "Gửi",
    "category": "Sức khỏe",
    "description": "Đóng tiền tập gym tháng",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-22T14:45:00Z"
  },
  {
    "amount": 130000,
    "wallet": "Wallet number 1",
    "partner": "Cửa hàng điện tử",
    "type": "Gửi",
    "category": "Khác",
    "description": "Mua tai nghe mới",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2024-12-25T17:15:00Z"
  }
]

const fakeExpenses2 = [
  {
    "amount": 120000,
    "wallet": "Wallet number 1",
    "partner": "Nguyễn Văn A",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua áo khoác mùa đông",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-05T14:30:00Z"
  },
  {
    "amount": 45000,
    "wallet": "Wallet number 2",
    "partner": "Trần Thị B",
    "type": "Nhận",
    "category": "Giải trí",
    "description": "Tiền thắng cược game online",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-07T18:45:00Z"
  },
  {
    "amount": 200000,
    "wallet": "Wallet number 3",
    "partner": "Cửa hàng tiện lợi",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua đồ dùng cá nhân",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-10T09:20:00Z"
  },
  {
    "amount": 75000,
    "wallet": "Wallet number 1",
    "partner": "Nhà hàng ABC",
    "type": "Gửi",
    "category": "Giải trí",
    "description": "Ăn tối cùng bạn bè",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-12T20:10:00Z"
  },
  {
    "amount": 320000,
    "wallet": "Wallet number 2",
    "partner": "Phòng gym XYZ",
    "type": "Gửi",
    "category": "Sức khỏe",
    "description": "Đóng phí thành viên phòng gym",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-15T16:30:00Z"
  },
  {
    "amount": 60000,
    "wallet": "Wallet number 3",
    "partner": "Trạm xăng Petrolimex",
    "type": "Gửi",
    "category": "Di chuyển",
    "description": "Đổ xăng xe máy",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-17T08:15:00Z"
  },
  {
    "amount": 150000,
    "wallet": "Wallet number 1",
    "partner": "Hiệu sách Fahasa",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua sách lập trình",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-20T11:00:00Z"
  },
  {
    "amount": 50000,
    "wallet": "Wallet number 2",
    "partner": "Bệnh viện Đa khoa",
    "type": "Gửi",
    "category": "Sức khỏe",
    "description": "Mua thuốc cảm",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-22T14:50:00Z"
  },
  {
    "amount": 90000,
    "wallet": "Wallet number 3",
    "partner": "Taxi Mai Linh",
    "type": "Gửi",
    "category": "Di chuyển",
    "description": "Đi taxi từ sân bay về nhà",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-25T21:30:00Z"
  },
  {
    "amount": 250000,
    "wallet": "Wallet number 1",
    "partner": "Điện máy Xanh",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua tai nghe Bluetooth",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-01-28T10:00:00Z"
  }
]

const fakeExpenses3 = [
  {
    "amount": 150000,
    "wallet": "Wallet number 1",
    "partner": "Nguyễn Văn B",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua áo khoác mới",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-02T10:15:00Z"
  },
  {
    "amount": 80000,
    "wallet": "Wallet number 2",
    "partner": "Shop ABC",
    "type": "Gửi",
    "category": "Giải trí",
    "description": "Mua vé xem phim",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-05T18:30:00Z"
  },
  {
    "amount": 250000,
    "wallet": "Wallet number 3",
    "partner": "Nhà hàng XYZ",
    "type": "Gửi",
    "category": "Ăn uống",
    "description": "Ăn tối với bạn bè",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-07T20:00:00Z"
  },
  {
    "amount": 60000,
    "wallet": "Wallet number 1",
    "partner": "Nguyễn Văn C",
    "type": "Nhận",
    "category": "Khác",
    "description": "Nhận tiền mừng tuổi",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-10T09:45:00Z"
  },
  {
    "amount": 120000,
    "wallet": "Wallet number 2",
    "partner": "Hiệu sách DEF",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua sách mới",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-12T15:20:00Z"
  },
  {
    "amount": 300000,
    "wallet": "Wallet number 3",
    "partner": "Spa Relax",
    "type": "Gửi",
    "category": "Sức khỏe",
    "description": "Đi spa thư giãn",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-14T17:30:00Z"
  },
  {
    "amount": 95000,
    "wallet": "Wallet number 1",
    "partner": "Quán cafe 123",
    "type": "Gửi",
    "category": "Giải trí",
    "description": "Uống cafe cùng bạn",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-17T14:10:00Z"
  },
  {
    "amount": 50000,
    "wallet": "Wallet number 2",
    "partner": "Nguyễn Văn D",
    "type": "Nhận",
    "category": "Khác",
    "description": "Nhận tiền hoàn trả",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-20T11:00:00Z"
  },
  {
    "amount": 220000,
    "wallet": "Wallet number 3",
    "partner": "Gym Center",
    "type": "Gửi",
    "category": "Sức khỏe",
    "description": "Gia hạn thẻ tập gym",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-22T16:00:00Z"
  },
  {
    "amount": 135000,
    "wallet": "Wallet number 1",
    "partner": "Cửa hàng tiện lợi",
    "type": "Gửi",
    "category": "Mua sắm",
    "description": "Mua đồ dùng cá nhân",
    "userId": "65f8c1e5b3a2a4d8f0e7a6b9",
    "createdAt": "2025-02-25T19:00:00Z"
  }
]

import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:3000/expense/add_fee"; // API endpoint

export const createMultipleTransactions = async () => {
  try {
    const responses = await Promise.all(
      fakeExpenses2.map(expense =>
        axios.post(API_BASE_URL, expense, {
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    console.log("Tạo giao dịch thành công:", responses.map(res => res.data));
  } catch (error) {
    console.error("Lỗi khi tạo giao dịch:", error);
  }
};

// Gọi hàm để tạo giao dịch
createMultipleTransactions();
