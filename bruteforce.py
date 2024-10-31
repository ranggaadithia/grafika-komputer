import matplotlib.pyplot as plt

def brute_force_line(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    
    x_points = []
    y_points = []
    
    if abs(dx) > abs(dy):
        if x1 > x2:
            x1, x2 = x2, x1
            y1, y2 = y2, y1
        for x in range(x1, x2 + 1):
            y = y1 + dy * (x - x1) / dx
            x_points.append(x)
            y_points.append(round(y))
    else:  
        if y1 > y2:
            x1, x2 = x2, x1
            y1, y2 = y2, y1
        for y in range(y1, y2 + 1):
            x = x1 + dx * (y - y1) / dy
            x_points.append(round(x))
            y_points.append(y)

    return x_points, y_points

x1 = int(input("Masukkan nilai x1: "))
y1 = int(input("Masukkan nilai y1: "))
x2 = int(input("Masukkan nilai x2: "))
y2 = int(input("Masukkan nilai y2: "))

x_points, y_points = brute_force_line(x1, y1, x2, y2)

plt.plot(x_points, y_points, marker='o', color='b')
plt.title("Algoritma Brute Force untuk Pembuatan Garis")
plt.xlabel("X")
plt.ylabel("Y")
plt.grid()
plt.show()
