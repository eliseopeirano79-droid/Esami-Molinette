"""Genera data/bank.js da data/bank.json per la distribuzione statica/file://.
Uso: python tools/pack_bank.py
"""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
p=root/'data'/'bank.json'
data=json.loads(p.read_text(encoding='utf-8'))
assert isinstance(data.get('questions'),list)
(root/'data'/'bank.js').write_text('window.ESAMI_MOLINETTE_BANK='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
print('Creato data/bank.js:',len(data['questions']),'schede')
