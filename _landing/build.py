# -*- coding: utf-8 -*-
"""군위수서 주중 이용권 랜딩 빌드: 템플릿 -> 영업사원별 폴더 (ryu/, lee/)
사용: python _landing/build.py   (저장소 루트에서)
"""
import os, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PEOPLE = [
    {'id': 'ryu', 'name': '류성현', 'title': '이사', 'phone': '010-4654-9644'},
    {'id': 'lee', 'name': '이승재', 'title': '팀장', 'phone': '010-6693-2846'},
]
V = format(int(time.time()), 'x')
tpl = open(os.path.join(ROOT, '_landing', 'template.html'), encoding='utf-8').read()
only = sys.argv[1:]
for p in PEOPLE:
    if only and p['id'] not in only:
        continue
    html = (tpl.replace('{{V}}', V).replace('{{SPID}}', p['id']).replace('{{NAME}}', p['name'])
            .replace('{{TITLE}}', p['title']).replace('{{PHONE}}', p['phone'])
            .replace('{{DIGITS}}', p['phone'].replace('-', '')))
    d = os.path.join(ROOT, p['id']); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf-8', newline='\n').write(html)
    print('OK', p['id'], p['name'], p['phone'])
