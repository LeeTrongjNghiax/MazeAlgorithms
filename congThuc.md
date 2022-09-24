<style>
r { color: Red }
o { color: Orange }
g { color: Green }
</style>

# Một vài đại lượng tuyệt đối
## Số tuyệt đối liên hoàn
$$ y_{lh} = y_i - y_{i-1} (i = 2, 3, 4,...,n) $$

## Số tuyệt đối định gốc
$$ y_{dg} = y_i - y_1 (i = 2, 3, 4,...,n) $$

## Mối liên hệ
$$ \sum{y_i - y_{i-1}} = y_i - y_1 $$

# Tốc độ phát triển
## Tốc độ phát triển liên hoàn:
$$ t_i = {y_i \over y_{i-1}} $$
- $ t_i $: tốc độ phát triển liên hoàn
- $ y_i $: mức độ chỉ tiêu ở kì nghiên cứu $
- $ y_{i-1} $: mức độ chỉ tiêu ở kì liền kề trước kì nghiên cứu $

## Tốc độ phát triển định gốc:
$$ T_i = {y_i \over y_1} $$
- $ T_i $: tốc độ phát triển định gốc
- $ y_n $: mức độ ứng với thời gian $ t_n $

## Mối liên hệ:
$$ T_i = \prod_{i=2}^n{t_i} $$

## Tốc độ phát triển trung bình:
$$ \overline{t} = \sqrt[n-1]{t_2 \times t_2 \times ... \times t_{n}} = \sqrt[n-1]{y_n \over y_1} = \sqrt[n-1]{\displaystyle \prod_{i=2}^n{t_i}} = \sqrt[n-1]{T_i}$$

# Các mức độ đo xu hướng trọng tâm
## Trung bình cộng - Mean
### Trung bình cộng đơn giản
#### Trung bình cộng tổng thể:
$$ \mu = {\displaystyle \sum_{i=1}^n{x_i} \over N} $$
- $N$: số lượng dữ liệu trong tổng thể
#### Trung bình cộng mẫu:
$$ \overline{X} = {\displaystyle \sum_{i=1}^n{x_i} \over n} $$
- $n$: số lượng dữ liệu trong mẫu

### Trung bình cộng gia quyền (có trọng số):
$$ \overline{x} = {\displaystyle \sum_{i=1}^n{x_if_i} \over \displaystyle \sum_{i=1}^n{f_i}} $$

### Số trung bình điều hoà - Harmonic mean:
$$ \overline{x} = {\displaystyle \sum_{i=1}^n{x_if_i} \over \displaystyle \sum_{i=1}^n{ {x_if_i} \over {x_i} }} $$

### Số trung bình nhân:
$$ \overline{x} = \sqrt[n]{x_1 \times x_2 \times ... \times x_n} = \sqrt[n]{\displaystyle \prod_{i=1}^n{x_i}} $$

### Số trung bình nhân gia quyền (có trọng số):
$$ \overline{x} = \sqrt[n]{x_1^{f_1} \times x_2^{f_2} \times ... \times x_n^{f_n}} = \sqrt[\displaystyle \sum_{i=1}^n{f_i}]{\displaystyle \prod_{i=1}^n{x_i^{f_i}}} $$

### Giá trị bình quân cho dữ liệu phân nhóm
$$ \overline{X} = {\displaystyle \sum_{i=1}^k{x_if_i} \over \displaystyle \sum_{i=1}^k{f_i}} $$
- Nếu tổ có giới hạn trên và dưới:
$$ x_i = { x_{i_{max}} + x_{i_{min}} \over 2 } $$
- Nếu tổ không có giới hạn trên:
$$ x_i = { x_{i_{min}} + {h \over 2}} $$
- Nếu tổ không có giới hạn dưới:
$$ x_i = { x_{i_{max}} - {h \over 2}} $$

## Trung vị - Median
- Khi N chẵn:
$$ Me = { (N + 1)^{th} \over 2 } {term} $$
- Khi N lẻ:
$$ Me = { \displaystyle {\left(N^{th} \over 2\right)term + \left({N^{th} \over 2} + 1\right)^{th}term} \over 2 } $$

### Trung vị cho dữ liệu phân nhóm:
- Bước 1: Tính tần số tích luỹ ($S$)
- Bước 2: Nhóm chứa trung vị là nhóm có $\displaystyle S_{min} \geq {{n + 1} \over 2}$
- Bước 3: Áp dụng công thức:
$$ Me = X_{Me(Min)} + h_{Me}{\displaystyle {n \over 2} - S_{Me-1} \over f_{Me}}$$
- $X_{Me(Min)}$: giới hạn dưới của nhóm chứa $Me$
- $h_{Me}$: khoảng cách của nhóm chứa $Me$
- $S_{Me-1}$: tần số tích luỹ của nhóm đứng trước nhóm chứa $Me$
- $f_{Me}$: tần số của nhóm chứa $Me$

## Yếu vị - Mode:
$Mo = x_i$ khi $f_i$ lớn nhất
### Yếu vị cho dữ liệu có phân nhóm
#### Có khoảng cách đều nhau:
- Bước 1: Tính tần số tích luỹ ($S$)
- Bước 2: Nhóm chứa yếu vị là nhóm có $\displaystyle S_{min} \geq {{n + 1} \over 2}$
- Bước 3: Áp dụng công thức:
$$ Mo = X_{Mo(Min)} + h_{Mo}{f_{Mo} - f_{Mo-1} \over (f_{Mo} - f_{Mo-1} ) + (f_{Mo} - f_{Mo+1} )}$$
- $X_{Mo(Min)}$: giới hạn dưới của nhóm chứa $Mo$
- $h_{Mo}$: khoảng cách của nhóm chứa $Mo$
- $f_{Mo-1}$: tần số của nhóm đứng trước nhóm chứa $Mo$
- $f_{Mo}$: tần số của nhóm chứa $Mo$
- $f_{Mo+1}$: tần số của nhóm đứng sau nhóm chứa $Mo$

#### Có khoảng cách không đều nhau:
- Bước 1: Tính tần số tích luỹ ($S$)
- Bước 2: Nhóm chứa yếu vị là nhóm có $\displaystyle S_{min} \geq {{n + 1} \over 2}$
- Bước 3: Áp dụng công thức:
$$ Mo = X_{Mo(Min)} + h_{Mo}{g_{Mo} - g_{Mo-1} \over (g_{Mo} - g_{Mo-1} ) + (g_{Mo} - g_{Mo+1} )}$$
với $g_i = \displaystyle {f_i \over h_i}$
- $X_{Mo(Min)}$: giới hạn dưới của nhóm chứa $Mo$
- $h_{Mo}$: khoảng cách của nhóm chứa $Mo$
- $g_{Mo-1}$: mật độ phân phối của nhóm đứng trước nhóm chứa $Mo$
- $g_{Mo}$: mật độ phân phối của nhóm chứa $Mo$
- $g_{Mo+1}$: mật độ phân phối của nhóm đứng sau nhóm chứa $Mo$

## Tứ phân vị
$$ Q_1 = \left({1 \over 4} \times (n+1)\right) term$$
$$ Q_2 = \left({1 \over 2} \times (n+1)\right) term$$
$$ Q_3 = \left({3 \over 4} \times (n+1)\right) term$$

### Độ trải giữa (khoảng tứ phân vị) - Interquartile Range
$$ IQR = Q_3 - Q_1$$