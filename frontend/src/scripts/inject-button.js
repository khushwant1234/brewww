(() => {
    console.log("Creating button and status div");
  
    // Create Button
    const button = document.createElement("button");
    Object.assign(button.style, {
      position: "fixed",
      top: "120px",
      right: "10px",
      zIndex: "999999",
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
    });
    button.onmouseover = () => (button.style.backgroundColor = "#0056b3");
    button.onmouseout = () => (button.style.backgroundColor = "#007bff");
    button.textContent = "Process Courses";
    document.body.appendChild(button);
  
    // Create Status Div
    const statusDiv = document.createElement("div");
    Object.assign(statusDiv.style, {
      position: "fixed",
      top: "160px",
      right: "10px",
      zIndex: "999999",
      padding: "8px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontFamily: "Arial, sans-serif",
      fontSize: "12px",
      display: "none",
    });
    statusDiv.textContent = "Status: Idle";
    document.body.appendChild(statusDiv);
  
    // Add Button Click Event
    button.addEventListener("click", () => {
      statusDiv.style.display = "block";
      statusDiv.textContent = "Processing...";
      setTimeout(() => {
        statusDiv.textContent = "Process Complete!";
      }, 2000);
    });
  
    console.log("Button and status div added to the page");
  })();