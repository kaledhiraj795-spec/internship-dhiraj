const searchInput = document.getElementById("program-search");
const typeSelect = document.getElementById("program-type-filter");
const status = document.getElementById("program-filter-status");
const programCards = [...document.querySelectorAll("#program-grid .program-card")];
const preferenceKey = "asm-admission-program-preferences";

if (searchInput && typeSelect && status && programCards.length > 0) {
    const savePreferences = () => {
        try {
            localStorage.setItem(preferenceKey, JSON.stringify({
                search: searchInput.value,
                type: typeSelect.value
            }));
        } catch (error) {
            console.warn("Could not save admission program preferences.", error);
        }
    };

    const filterPrograms = () => {
        const query = searchInput.value.trim().toLocaleLowerCase();
        const selectedType = typeSelect.value;
        let visibleCount = 0;

        programCards.forEach((card) => {
            const title = card.querySelector("h3")?.textContent.toLocaleLowerCase() ?? "";
            const matchesTitle = title.includes(query);
            const matchesType = selectedType === "all" || card.dataset.programType === selectedType;
            const isVisible = matchesTitle && matchesType;

            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        status.textContent = visibleCount === 0
            ? "No programs match your search. Try another title or program type."
            : `${visibleCount} ${visibleCount === 1 ? "program" : "programs"} found.`;
        savePreferences();
    };

    try {
        const savedPreferences = localStorage.getItem(preferenceKey);
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            if (preferences && typeof preferences.search === "string") {
                searchInput.value = preferences.search;
            }
            if (preferences && ["all", "ug", "pg"].includes(preferences.type)) {
                typeSelect.value = preferences.type;
            }
        }
    } catch (error) {
        console.warn("Could not restore admission program preferences.", error);
    }

    searchInput.addEventListener("input", filterPrograms);
    typeSelect.addEventListener("change", filterPrograms);
    filterPrograms();
}
