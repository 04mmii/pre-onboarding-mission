import React, { useState } from 'react';
import './App.css'; 
import { dummy } from './data';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() === '') {
      setFilteredItems([]);
    } else {
      setFilteredItems(dummy.filter(item => item.description.toLowerCase().includes(value.toLowerCase())));
    }
  };

  const handleSearchClick = () => {
    // 검색 버튼 클릭 시 수행할 작업을 여기에 작성
    console.log(`Selected item: ${inputValue}`);
    // 검색 결과를 처리하는 로직을 추가
  };

  const handleItemClick = (item) => {
    setInputValue(item.description);
    setFilteredItems([]);
  };

  // 데이터 유형별로 그룹화
  const groupedItems = filteredItems.reduce((groups, item) => {
    const { type } = item;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(item);
    return groups;
  }, {});

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
        className="search-input"
      />
      <button onClick={handleSearchClick} className="search-button">
        +
      </button>
      {Object.keys(groupedItems).length > 0 && (
        <ul className="dropdown-list">
          {Object.keys(groupedItems).map(type => (
            <React.Fragment key={type}>
              <li className="dropdown-section">{type}</li>
              {groupedItems[type].map((item, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleItemClick(item)}
                >
                  {item.description}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
