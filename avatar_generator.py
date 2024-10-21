from flask import Flask, request, send_file, render_template
from PIL import Image, ImageDraw, ImageFont
import io

app = Flask(__name__)

def generate_avatar(text, bg_color, text_color):
    img = Image.new('RGB', (256, 256), color=bg_color)
    d = ImageDraw.Draw(img)

    try:
        font = ImageFont.truetype("arial.ttf", 150)
    except IOError:
        font = ImageFont.load_default()

    text_bbox = d.textbbox((0, 0), text, font=font)
    text_size = (text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1])
    text_position = ((256 - text_size[0]) / 2, (256 - text_size[1]) / 2)

    d.text(text_position, text, fill=text_color, font=font)

    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    return img_byte_arr

@app.route('/avatar')
def avatar():
    name = request.args.get('name', 'A')
    bg_color = request.args.get('bg_color', '#3498db')
    text_color = request.args.get('text_color', '#ffffff')

    initials = name[:2].upper()
    img = generate_avatar(initials, bg_color, text_color)

    return send_file(img, mimetype='image/png')

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
