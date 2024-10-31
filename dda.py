import matplotlib.pyplot as plt

def dda_line(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    
    steps = max(abs(dx), abs(dy))
    
    x_increment = dx / steps
    y_increment = dy / steps
    
    x = x1
    y = y1
    x_points = [round(x)]
    y_points = [round(y)]
    
    for _ in range(int(steps)):
        x += x_increment
        y += y_increment
        x_points.append(round(x))
        y_points.append(round(y))
    
    return x_points, y_points

x1 = int(input("Masukkan nilai x1: "))
y1 = int(input("Masukkan nilai y1: "))
x2 = int(input("Masukkan nilai x2: "))
y2 = int(input("Masukkan nilai y2: "))

x_points, y_points = dda_line(x1, y1, x2, y2)

plt.plot(x_points, y_points, marker='o', color='b')
plt.title("Algoritma DDA untuk Pembuatan Garis")
plt.xlabel("X")
plt.ylabel("Y")
plt.grid()
plt.show()
