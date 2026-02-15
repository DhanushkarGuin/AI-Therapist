from PIL import Image

def remove_white_background(input_path, output_path, tolerance=200):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is close to white
        if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
            newData.append((255, 255, 255, 0)) # Fully transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    # Use the generated image path
    input_file = r"C:\Users\aryad\.gemini\antigravity\brain\03d6363e-e230-4b7d-bd06-f05e8e638819\aletheia_robot_v3_transparent_1769929584103.png"
    output_file = r"c:\Users\aryad\OneDrive\Desktop\therapist_temp\AI-Therapist 123\frontend\src\assets\robot-assistant.png"
    remove_white_background(input_file, output_file)
