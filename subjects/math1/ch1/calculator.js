let expr = '';
        let memory = 0;
        let angleMode = 'deg'; // 'deg' | 'rad' | 'grad'
        let lastResult = '0';
        let justEvaluated = false;
        let secondMode = false;

        const exprEl = document.getElementById('calc-expr');
        const resultEl = document.getElementById('calc-result');

        function setMode(m) {
            angleMode = m;
            ['deg','rad'].forEach(id => {
                document.getElementById('btn-' + id).classList.toggle('active', id === m);
            });
        }

        function updateDisplay() {
            exprEl.textContent = expr;
            // Shrink font if long
            resultEl.style.fontSize = lastResult.length > 14 ? '16px' : lastResult.length > 10 ? '20px' : '26px';
            resultEl.textContent = lastResult;
        }

        function input(ch) {
            if (justEvaluated && /[\d.]/.test(ch)) { expr = ''; }
            if (justEvaluated && /[+−×÷]/.test(ch)) { expr = lastResult; }
            justEvaluated = false;
            expr += ch;
            updateDisplay();
        }

        function clearAll() { expr = ''; lastResult = '0'; justEvaluated = false; updateDisplay(); }
        function clearEntry() {
    expr = expr.slice(0, -1);

    if (!expr) {
        lastResult = '0';
    }

    updateDisplay();

        }
        function delChar() { expr = expr.slice(0, -1); if (!expr) lastResult = '0'; updateDisplay(); }

        function toggleSign() {
            if (!expr) return;
            if (expr.startsWith('-(') && expr.endsWith(')')) {
                expr = expr.slice(2, -1);
            } else {
                expr = '-(' + expr + ')';
            }
            updateDisplay();
        }

        function toRad(x) {
            if (angleMode === 'rad') return x;
            if (angleMode === 'grad') return x * Math.PI / 200;
            return x * Math.PI / 180;
        }

        function fromRad(x) {
            if (angleMode === 'rad') return x;
            if (angleMode === 'grad') return x * 200 / Math.PI;
            return x * 180 / Math.PI;
        }

        function factorial(n) {
            n = Math.round(n);
            if (n < 0) return NaN;
            if (n === 0 || n === 1) return 1;
            if (n > 170) return Infinity;
            let r = 1;
            for (let i = 2; i <= n; i++) r *= i;
            return r;
        }

        function fn(name) {
            let cur = parseFloat(lastResult);
            let result;

            // Prefix functions (append to expression)
            const prefixMap = {
                'sin': 'sin(', 'cos': 'cos(', 'tan': 'tan(',
                'asin': 'asin(', 'acos': 'acos(', 'atan': 'atan(',
                'ln': 'ln(', 'log': 'log(', 'sqrt': '√(', 'cbrt': '∛(',
                'abs': '|(', 'ex': 'e^('
            };

            if (prefixMap[name]) {
                expr += prefixMap[name];
                updateDisplay();
                return;
            }

            // Immediate functions using lastResult
            if (isNaN(cur) && name !== 'pi' && name !== 'e' && name !== 'rand') return;

            switch (name) {
                case 'pi':   expr += 'π'; updateDisplay(); return;
                case 'e':    expr += 'e'; updateDisplay(); return;
                case 'rand': result = Math.random(); break;
                case 'x2':   result = cur * cur; break;
                case 'x3':   result = cur * cur * cur; break;
                case 'xn':   expr += '^'; updateDisplay(); return;
                case '10x':  result = Math.pow(10, cur); break;
                case 'nrt':  expr += 'root('; updateDisplay(); return;
                case 'inv':  result = 1 / cur; break;
                case 'fact': result = factorial(cur); break;
                case 'pct':  result = cur / 100; break;
                case '2nd':  secondMode = !secondMode; return;
                default: result = NaN;
            }

            lastResult = formatResult(result);
            expr = '';
            justEvaluated = true;
            updateDisplay();
        }

        function formatResult(n) {
            if (isNaN(n)) return 'Error';
            if (!isFinite(n)) return n > 0 ? '∞' : '-∞';
            // Avoid floating-point noise
            let s = parseFloat(n.toPrecision(12)).toString();
            return s;
        }

function calcEvaluate() {
    if (!expr) return;

    try {
        let e = expr;

        // Constants
        e = e.replace(/π/g, 'Math.PI');
        e = e.replace(/\be\b/g, 'Math.E');

        // Operators
        e = e.replace(/÷/g, '/');
        e = e.replace(/×/g, '*');
        e = e.replace(/−/g, '-');
        e = e.replace(/\^/g, '**');
        e = e.replace(/mod/g, '%');

        // Functions
        e = e.replace(/sin\(/g, 'Math.sin(');
        e = e.replace(/cos\(/g, 'Math.cos(');
        e = e.replace(/tan\(/g, 'Math.tan(');

        e = e.replace(/asin\(/g, 'Math.asin(');
        e = e.replace(/acos\(/g, 'Math.acos(');
        e = e.replace(/atan\(/g, 'Math.atan(');

        e = e.replace(/ln\(/g, 'Math.log(');
        e = e.replace(/log\(/g, 'Math.log10(');

        e = e.replace(/√\(/g, 'Math.sqrt(');
        e = e.replace(/∛\(/g, 'Math.cbrt(');

        e = e.replace(/\|\(/g, 'Math.abs(');

        // Evaluate
        let res = eval(e);

        lastResult = formatResult(res);

        // UPDATE DISPLAY
        exprEl.textContent = expr + ' =';
        resultEl.textContent = lastResult;

        expr = '';
        justEvaluated = true;

    } catch (err) {
        console.error(err);

        lastResult = 'Error';
        resultEl.textContent = 'Error';
    }
}

        function mc()     { memory = 0; }
        function mr()     { expr += memory.toString(); updateDisplay(); }
        function ms()     { memory = parseFloat(lastResult) || 0; }
        function mplus()  { memory += parseFloat(lastResult) || 0; }
        function mminus() { memory -= parseFloat(lastResult) || 0; }

        // Keyboard support
        document.addEventListener('keydown', e => {
            if (e.key >= '0' && e.key <= '9') input(e.key);
            else if (e.key === '.') input('.');
            else if (e.key === '+') input('+');
            else if (e.key === '-') input('−');
            else if (e.key === '*') input('×');
            else if (e.key === '/') { e.preventDefault(); input('÷'); }
            else if (e.key === '(') input('(');
            else if (e.key === ')') input(')');
            else if (e.key === '%') input('mod');
            else if (e.key === 'Enter' || e.key === '=') calcEvaluate();
            else if (e.key === 'Backspace') delChar();
            else if (e.key === 'Escape') clearAll();
        });
