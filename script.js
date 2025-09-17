document.getElementById("dropoutForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Collect form data
    const formData = {
        attendance: document.querySelector("[name='attendance']").value,
        grades: document.querySelector("[name='grades']").value,
        participation: document.querySelector("[name='participation']").value,
        financial_issue: document.querySelector("[name='financial_issue']").value,
        family_support: document.querySelector("[name='family_support']").value,
        health_issue: document.querySelector("[name='health_issue']").value
    };

    try {
        const response = await fetch("https://dropbackend-production.up.railway.app/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        // Check if response is OK
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unknown backend error");
        }

        const data = await response.json();

        // Display results
        document.getElementById("risk").textContent = data.risk;
        const suggestionsList = document.getElementById("suggestions");
        suggestionsList.innerHTML = "";
        data.suggestions.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            suggestionsList.appendChild(li);
        });

        document.getElementById("result").style.display = "block";

    } catch (err) {
        alert("Error connecting to backend! Check console for details.");
        console.error("Backend connection error:", err);
    }
});

