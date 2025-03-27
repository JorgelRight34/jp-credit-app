n = 841
x = 1
for _ in range(50):
    nx = (x + n / x) / 2
    x = nx

a = 315
b = 840
while (b > 0):
    a %= b
    a_tmp = a
    b_tmp = b
    a = b_tmp
    b = a_tmp


x = 1
i = 1
while ( i <= 128):
    x += x
    i += 1

print(x)