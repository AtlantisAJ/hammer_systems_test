import React, { useState } from 'react';
import '../../../assets/less/styles/components/layoutScheme/_layoutScheme.less';

const LayoutScheme = () => {
  const objects = [
    { id: 'table', name: 'Стол', image: 'https://via.placeholder.com/40?text=Table' },
    { id: 'chair', name: 'Стул', image: 'https://via.placeholder.com/40?text=Chair' },
    { id: 'partition', name: 'Перегородка', image: 'https://via.placeholder.com/40?text=Partition' },
  ];

  const [placedObjects, setPlacedObjects] = useState([]);

  const handleSave = () => {
    const data = JSON.stringify(placedObjects);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'layout.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const loadedObjects = JSON.parse(event.target.result);
        setPlacedObjects(loadedObjects);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="layout-scheme-container">
      <h2>Планировщик зала</h2>
      <div className="controls">
        <button onClick={handleSave}>Сохранить расстановку</button>
        <label className="upload-btn">
          Загрузить расстановку
          <input type="file" accept=".json" onChange={handleLoad} style={{ display: 'none' }} />
        </label>
      </div>
      <div className="layout-content">
        <div className="objects-panel">
          <h3>Объекты</h3>
          {objects.map(obj => (
            <div
              key={obj.id}
              className="object-item"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('object', JSON.stringify(obj))}
            >
              <img src={obj.image} alt={obj.name} className="object-image" />
              <p>{obj.name}</p>
            </div>
          ))}
        </div>
        <div
          className="board"
          onDrop={(e) => {
            e.preventDefault();
            const obj = JSON.parse(e.dataTransfer.getData('object'));
            const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
            const y = e.clientY - e.currentTarget.getBoundingClientRect().top;
            setPlacedObjects([...placedObjects, { ...obj, x, y }]);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {placedObjects.map((placed, index) => (
            <div
              key={`${placed.id}-${index}`}
              className="placed-object"
              style={{ left: placed.x, top: placed.y }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('index', index);
              }}
              onDragEnd={(e) => {
                const newX = e.clientX - e.currentTarget.parentElement.getBoundingClientRect().left;
                const newY = e.clientY - e.currentTarget.parentElement.getBoundingClientRect().top;
                const newObjects = [...placedObjects];
                newObjects[index] = { ...newObjects[index], x: newX, y: newY };
                setPlacedObjects(newObjects);
              }}
            >
              <img src={placed.image} alt={placed.name} className="object-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutScheme;
