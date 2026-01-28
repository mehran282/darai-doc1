#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Convert Markdown to HTML that can be opened in Word
"""

import re

def markdown_to_html(md_content):
    """Convert markdown to HTML"""
    html = """<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>برآورد صرفه‌جویی جایگزینی نیروی انسانی با گلوسا</title>
    <style>
        @font-face {
            font-family: 'Vazirmatn';
            src: url('public/fonts/Vazirmatn-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }
        @font-face {
            font-family: 'Vazirmatn';
            src: url('public/fonts/Vazirmatn-Bold.woff2') format('woff2');
            font-weight: bold;
            font-style: normal;
        }
        @font-face {
            font-family: 'Vazirmatn';
            src: url('public/fonts/Vazirmatn-Medium.woff2') format('woff2');
            font-weight: 500;
            font-style: normal;
        }
        body {
            font-family: 'Vazirmatn', 'Tahoma', 'Arial', sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            direction: rtl;
        }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        h2 { color: #34495e; border-bottom: 2px solid #95a5a6; padding-bottom: 5px; margin-top: 30px; }
        h3 { color: #7f8c8d; margin-top: 20px; }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            font-size: 14px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: right;
        }
        th {
            background-color: #3498db;
            color: white;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        hr {
            border: none;
            border-top: 2px solid #ecf0f1;
            margin: 30px 0;
        }
        strong {
            color: #2c3e50;
        }
    </style>
</head>
<body>
"""
    
    lines = md_content.split('\n')
    i = 0
    in_table = False
    table_lines = []
    
    def is_table_separator(line):
        """Check if line is a markdown table separator"""
        stripped = line.strip()
        if not '|' in stripped:
            return False
        # Check if it's a separator like |---|---| or |:---|:---:|---:|
        if re.match(r'^\|[\s\-:]+\|', stripped):
            return True
        # Check if it contains mostly dashes and pipes
        if stripped.replace('-', '').replace('|', '').replace(':', '').replace(' ', '') == '':
            return True
        return False
    
    while i < len(lines):
        line = lines[i]
        
        # Check if it's a table separator - skip it completely
        if is_table_separator(line):
            i += 1
            continue
        
        # Tables
        if '|' in line:
            if not in_table:
                in_table = True
                table_lines = []
            table_lines.append(line)
        elif in_table:
            # End of table
            if table_lines:
                html += '<table>\n'
                for j, row in enumerate(table_lines):
                    cells = [cell.strip() for cell in row.split('|')[1:-1]]
                    tag = 'th' if j == 0 else 'td'
                    html += '<tr>\n'
                    for cell in cells:
                        cell = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', cell)
                        html += f'<{tag}>{cell}</{tag}>\n'
                    html += '</tr>\n'
                html += '</table>\n'
                table_lines = []
            in_table = False
        
        if not in_table:
            # Headers
            if line.startswith('# '):
                html += f'<h1>{line[2:].strip()}</h1>\n'
            elif line.startswith('## '):
                html += f'<h2>{line[3:].strip()}</h2>\n'
            elif line.startswith('### '):
                html += f'<h3>{line[4:].strip()}</h3>\n'
            elif line.startswith('#### '):
                html += f'<h4>{line[5:].strip()}</h4>\n'
            # Horizontal rule
            elif line.strip() == '---':
                html += '<hr>\n'
            # Code block
            elif line.strip().startswith('```'):
                pass
            # List items
            elif line.strip().startswith('- ') or line.strip().startswith('* '):
                text = line.strip()[2:]
                text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
                html += f'<ul><li>{text}</li></ul>\n'
            # Regular paragraph
            elif line.strip():
                # Skip if it looks like a table separator
                if not is_table_separator(line):
                    text = line.strip()
                    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
                    text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
                    html += f'<p>{text}</p>\n'
        
        i += 1
    
    # Final table
    if table_lines:
        html += '<table>\n'
        for j, row in enumerate(table_lines):
            cells = [cell.strip() for cell in row.split('|')[1:-1]]
            tag = 'th' if j == 0 else 'td'
            html += '<tr>\n'
            for cell in cells:
                cell = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', cell)
                html += f'<{tag}>{cell}</{tag}>\n'
            html += '</tr>\n'
        html += '</table>\n'
    
    html += """
</body>
</html>
"""
    return html

if __name__ == "__main__":
    md_file = "برآورد-صرفه-جویی-جایگزینی-نیروی-انسانی.md"
    html_file = "برآورد-صرفه-جویی-جایگزینی-نیروی-انسانی.html"
    
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    html_content = markdown_to_html(md_content)
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("HTML file created successfully!")
    print("Open the HTML file in Microsoft Word and save as .docx")
