# Giới thiệu về Atomic design pattern
- Atomic là một nguyên lý thuyết kế giúp tối đa hóa khả năng sử dụng lại trong quá trình phát triển phần mềm. (Designer, Developer)
- Giảm lặp lại code
- Tăng khả năng mở rộng của dự án, giảm thời gian đọc hiểu (Atomic khá là dễ hiểu cho người mới)
- Tăng sự đồng bộ trong toàn dự án
- Dễ thay đổi, chỉnh sửa khi cần thiết
# Atoms: 
- Là thành phần nhỏ nhất trên website, có thể là Button, Label, Input, Divider, Tooltip, ....
- Mõi component atoms có sử dụng logic thì logic nên được truyền từ bên ngoài vào.
- Mõi component có nhiều trạng thái vd: Button hover, focus, loading, ...

# Molecules:
- Tại đây sẽ tập hợp nhiều component atoms lại với nhau và tái sử dụng tối đa các atoms. Mõi molecule có thể có các action mà do chính nó tạo ra và truyền vào atoms mà trong chính atoms lại không có

# Organisms:
- Organism là tập hợp nhiều molecule làm việc với nhau hay có thể là atoms để tạo nên giao diện chi tiết hơn.
- Ở bước này các component bắt đầu có hình dáng cụ thể nhưng chúng vẫn phải đảm bảo tính độc lập, dễ dàng di chuyển và tái sử dụng trong bất kỳ trường hợp nào.

# Templates:
- Ở bước này chúng ta sẽ không đề cập đến xây dựng component mà chỉ tập trung vào việc các Organism, molecule, atom được thể hiện bố cục trên UI như thế nào .
- Template sẽ ko có bất kỳ dữ liệu, tất cả dữ liệu phải được bên ngoài truyền vào. Template sẽ là nơi render dữ liệu theo UI đã đc định sẵn 


# Cách áp dụng Atomic trong React
- Khi sử dụng atomic design pattern trong React, chúng ta cần chỉnh sửa một vài rule để đảm báo các component được tái sử dụng nhiều nhất có thể. Hay có thể gọi là stateless component (Không có hoặc ít nhất có thể). 
- Mõi khi xây dựng 1 component mới, chúng ta nên tự hỏi: Liệu component này có sử dụng lại ở đâu đó hay không? Những action, data nào cần phân tách ra khi sử dụng mới truyền vào?
- Nó có đủ khả năng để sử dụng trong bất kỳ trường hợp nào hay chưa?
- Nó có đủ độc lập hay chưa?
- Mõi component nên có những rule như sau:
  - Atomic nên có 1 file chứa tất cả các biến (style), và nó phải được import vào tất cả các component 
  - Atom nên đc viết mà không có margin, padding, position
  - Chỉ molecule, Organism hoặc những nơi sử dụng mới có thể cài đặt margin, padding, position của atom, nhưng chính component này cũng không thể tự style chúng cho chính mình
  - Template chỉ có một chức năng đó là cài đặt bố cục cho page, hoàn toàn không chứa data mà sẽ được truyền vào trong quá trình sử dụng
  - Tìm một phương thức lấy dữ liệu cho template, ví dụ mõi page sẽ có 1 Context API riêng
  - Không sử dụng trực tiếp context API của page từ molecules, organism, atoms
