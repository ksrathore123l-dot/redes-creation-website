const fs = require('fs');
let lines = fs.readFileSync('pages/work.css', 'utf8').split('\n');
let startIdx = lines.findIndex(l => l.startsWith('.project-image {'));
let endIdx = lines.findIndex(l => l.startsWith('.stats {'));

if (startIdx !== -1 && endIdx !== -1) {
    let newCss = \
.project-image {
  height: 220px;
  position: relative;
}
.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  position: relative;
  z-index: 1;
}
.project-card:hover .project-image img {
  transform: scale(1.05);
}
.project-image label {
  position: absolute;
  left: 20px;
  bottom: -18px;
  background: #0d6efd;
  color: #fff;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 10px rgba(13, 110, 253, 0.3);
}
.project-image label::before {
  content: '?';
  font-size: 16px;
}
.project-content {
  padding: 40px 25px 25px;
  position: relative;
  z-index: 2;
  background: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.project-content h3 {
  font-size: 20px;
  color: #111;
  margin: 0;
  font-weight: 700;
}
.project-content h3::after {
  content: '';
  display: block;
  width: 35px;
  height: 3px;
  background: #0d6efd;
  margin: 14px 0;
  border-radius: 2px;
}
.project-content p {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.6;
  margin: 0 0 25px 0;
  flex: 1;
}
.project-content a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  color: #0d6efd;
  margin-top: auto;
}
.project-content a span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #e9f2ff;
  border-radius: 50%;
  color: #0d6efd;
  font-size: 18px;
  transition: 0.3s;
}
.project-card:hover .project-content a span {
  background: #0d6efd;
  color: #fff;
}
\.trim();

    let newLines = [
        ...lines.slice(0, startIdx),
        newCss,
        '',
        ...lines.slice(endIdx - 1)
    ];
    
    fs.writeFileSync('pages/work.css', newLines.join('\n'));
    console.log('CSS successfully updated.');
} else {
    console.log('Could not find CSS boundaries. start:', startIdx, 'end:', endIdx);
}
