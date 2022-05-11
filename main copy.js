function round_number(num) {
    //first, move the decimal two places
    num = num * 100;

    //then, round the number to the nearest integer
    num = Math.round(num);

    //then move the decimal back two places
    num = num / 100;

    // handle trailing zeroes
    num = num.toFixed(2);

    return num;
}

//get all of the calculator inputs
const inputs = document.querySelectorAll("[name='qty']");

//evaluate all of the inputs
inputs.forEach(function(input){
input.addEventListener("change", function(e) {
    const this_input = e.target;
    const qty = parseFloat(e.target.value);
    const this_row = this_input.closest(".row");

    //\\
        const streetvendor = this_row.querySelector(".streetvendor");
            const streetvendor_span = streetvendor.querySelector("span");
                const streetvendor_price = parseFloat(streetvendor.dataset.price);
                    const streetvendor_cost = qty * streetvendor_price;
                    // update the span within the amazon div with the value of amazon_cost
                    streetvendor_span.innerHTML = round_number(streetvendor_cost);
                    streetvendor.classList.add("active");

        const freshdirect = this_row.querySelector(".freshdirect");
            const freshdirect_span = freshdirect.querySelector("span");
                const freshdirect_price = parseFloat(freshdirect.dataset.price);
                    const freshdirect_cost = qty * freshdirect_price
                    freshdirect_span.innerHTML = round_number(freshdirect_cost);
                    freshdirect.classList.add("active");

        let cheap = false;

        if(freshdirect_cost < streetvendor_cost) {
            cheap = freshdirect;
        }

        if(streetvendor_cost < freshdirect_cost) {
            cheap = streetvendor;
        }

        // throw a cheap class on whichever of the retailers ends up being the value of 'cheap'
        const current_cheap = this_row.querySelector(".cheap")

        // if current_cheap exists
        if (current_cheap) {current_cheap.classList.remove("cheap");

        }

        if (cheap) {
            cheap.classList.add("cheap");
        }
    // grand total
    
    let streetvendor_total = 0;
    let freshdirect_total = 0;

    const rows = document.querySelectorAll(".row:not(.total)")
    rows.forEach(function(this_row){
        let qty = this_row.querySelector("input").value;
        if(!qty){
            return false
        }
        qty = parseFloat(qty)
        const streetvendor = this_row.querySelector(".streetvendor");
        const streetvendor_price = parseFloat(streetvendor.dataset.price);
                const streetvendor_cost = qty * streetvendor_price;

        const freshdirect = this_row.querySelector(".freshdirect");
        const freshdirect_price = parseFloat(freshdirect.dataset.price);
                const freshdirect_cost = qty * freshdirect_price
                
        streetvendor_total = streetvendor_total + streetvendor_cost
        freshdirect_total = freshdirect_total + freshdirect_cost

    })

    const streetvendor_total_span = document.querySelector(".row.total .streetvendor span")
    const freshdirect_total_span = document.querySelector(".row.total .freshdirect span")


    streetvendor_total_span.innerHTML = round_number(streetvendor_total);
    freshdirect_total_span.innerHTML = round_number(freshdirect_total);

    document.querySelector(".row.total").classList.add("active")
    document.querySelector(".row.total .streetvendor").classList.add("active");
    document.querySelector(".row.total .freshdirect").classList.add("active");
    });

});