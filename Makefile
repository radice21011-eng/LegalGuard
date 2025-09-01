
CXX = g++
CXXFLAGS = -std=c++17 -O3 -Wall -Wextra -pthread
TARGET = quantum_server
SRCDIR = server
SOURCES = $(SRCDIR)/index.cpp

all: $(TARGET)

$(TARGET): $(SOURCES)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(SOURCES)

clean:
	rm -f $(TARGET)

run: $(TARGET)
	./$(TARGET)

install:
	@echo "Installing quantum dependencies..."
	@echo "No external dependencies needed - pure C++ quantum security"

.PHONY: all clean run install
