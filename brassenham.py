import matplotlib.pyplot as plt

def bresenham_line(x1, y1, x2, y2):
    x, y = x1, y1
    dx = abs(x2 - x1)
    dy = abs(y2 - y1)
    sx = 1 if x2 > x1 else -1  
    sy = 1 if y2 > y1 else -1  
    
    if dx > dy:
        err = dx / 2.0
        for _ in range(dx):
            x_points.append(x)
            y_points.append(y)
            err -= dy
            if err < 0:
                y += sy
                err += dx
            x += sx
    else:
        err = dy / 2.0
        for _ in range(dy):
            x_points.append(x)
            y_points.append(y)
            err -= dx
            if err < 0:
                x += sx
                err += dy
            y += sy

    x_points.append(x2)
    y_points.append(y2)

    return x_points, y_points

x1 = int(input("Masukkan nilai x1: "))
y1 = int(input("Masukkan nilai y1: "))
x2 = int(input("Masukkan nilai x2: "))
y2 = int(input("Masukkan nilai y2: "))

x_points, y_points = [], []
x_points, y_points = bresenham_line(x1, y1, x2, y2)

plt.plot(x_points, y_points, marker='o', color='b')
plt.title("Algoritma Bresenham untuk Pembuatan Garis")
plt.xlabel("X")
plt.ylabel("Y")
plt.grid()
plt.show()
