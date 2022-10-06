const domainsContainer = document.querySelector(".domains-container");
const domainCards = document.querySelector('.domains');
const notFound = document.getElementById("not-found");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById('search');

let stableData;
let mainData;

let checkedCategory = [];
let checkedDomain = [];

const notFoundBasedOnCondition = () => {
    if (mainData?.length === 0) {
        domainsContainer.classList.add('hidden');
        notFound.classList.remove('hidden');
    } else {
        domainsContainer.classList.remove('hidden');
        notFound.classList.add('hidden');
    }
}

function removeModal () {
    document.querySelector(".shadow-control").classList.remove("search-btn-container")
    document.getElementById("modal-filter-container").classList.remove("pt-[10px]","absolute", "top-0", "bg-white", "left-0", "w-screen", "min-h-screen", "z-[100]","flex","justify-center");
    document.getElementById("filter").classList.remove("always");
}


const fillDomainContainer = (dataItem) => {
    dataItem?.forEach(item => {
        document.querySelector('.domains').insertAdjacentHTML('afterbegin', `
                 <li id="${item.categories.join("")}" class="2sm:gap-[10px] 2sm:items-center 2sm:flex-col flex justify-between lg:px-[10px] relative group px-[20px] py-[16.6px] hover:bg-[#F5F5F8] hover:rounded-[10px] cursor-pointer">
                 <div class="flex items-center gap-[20px] lg:gap-[15px] sm:items-center">
                    <svg class="cursor-pointer group-hover:stroke-[#99CC66]" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                    <g id="Btn_send" transform="translate(-1.227 -2)">
                    <rect id="Rectangle" width="36" height="36" rx="10" transform="translate(1.227 2)" fill="#f5f5f8"/>
                    <path id="Shape" d="M5,3.821,8.577.244A.833.833,0,0,1,9.756,1.423L5.589,5.589a.833.833,0,0,1-1.179,0L.244,1.423A.833.833,0,0,1,1.423.244Z" transform="translate(14.227 18.083)" fill="#696974"/>
                    </g>
</svg>
                    <div class="text-[#171D25] font-TKT-Medium">${item.domainName}</div>
                 </div>
                 
                 
                 <div class="flex items-center gap-[20px] lg:gap-[15px] cursor-pointer 2sm:flex-row sm:flex-col-reverse">
                   <div class=" sm:flex sm:gap-[10px] sm:items-center">
                   <div>
                     <span class="text-[16px] font-TKT-Bold text-[#171725]">${item.price}</span><span class="text-[12px] font-TKT-Regular text-[#696974]"> &#8382;</span>
                   </div>
                   <div class="text-[#696974] font-TKT-Regular text-[12px]">${item.priceUsd}</div>
                 </div>
                   <div class="flex items-center gap-[7px] bg-[#99CC66] pt-[10.7px] pr-[9.5px] pl-[6.5px] pb-[8.7px] sm:px-[15px] rounded-[10px] group-hover:px-[15px]">
                   <span class="font-TKT-Medium text-white text-[14px] hidden group-hover:block sm:block">დამატება</span>
                   <svg xmlns="http://www.w3.org/2000/svg" width="19.94" height="16.594" viewBox="0 0 19.94 16.594">
                   <path id="Fill_932" data-name="Fill 932" d="M16.659,16.594h-.833a.958.958,0,0,1-.833-1.045.958.958,0,0,1,.833-1.045h.833a.958.958,0,0,1,.833,1.045A.958.958,0,0,1,16.659,16.594Zm-6.664,0H9.162a.958.958,0,0,1-.833-1.045A.958.958,0,0,1,9.162,14.5h.833a.958.958,0,0,1,.833,1.045A.958.958,0,0,1,9.995,16.594Zm6.2-3.7h-6.6a2.5,2.5,0,0,1-2.4-1.757L4.542,2.2a.837.837,0,0,0-.8-.589H.833A.82.82,0,0,1,0,.806.82.82,0,0,1,.833,0H3.741a2.5,2.5,0,0,1,2.4,1.757l.434,1.467H17.44a2.511,2.511,0,0,1,1.983.946,2.348,2.348,0,0,1,.441,2.06l-1.249,4.834A2.483,2.483,0,0,1,16.19,12.892ZM7.054,4.834l1.731,5.859a.835.835,0,0,0,.8.588h6.6A.828.828,0,0,0,17,10.668l1.25-4.834a.781.781,0,0,0-.148-.684.838.838,0,0,0-.661-.315Z" fill="#fff"/>
                   </svg>
                   </div>
                   <div class="flex hidden items-center gap-[6px] bg-[#F5F5F8] px-[17px] py-[9px] rounded-[10px]">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
  <g id="Group_4868" data-name="Group 4868" transform="translate(-525.6 -141.271)">
    <rect id="Rectangle_2029" data-name="Rectangle 2029" width="18" height="18" rx="9" transform="translate(525.6 141.271)" fill="#9c6"/>
    <path id="Checklist" d="M1.661,2.713A.976.976,0,1,0,.29,4.1L2.77,6.549a.976.976,0,0,0,1.438-.073L8.234,1.6A.976.976,0,0,0,6.729.355L3.382,4.411Z" transform="translate(529.828 147.394)" fill="#fff"/>
  </g>
</svg>
                   <span class="font-TKT-Medium text-[#696974] text-[14px]">კალათაშია</span>
                   </div>
                 </div>
                 </li>`
        );
    });
}

const checkCategories = (item, categories) => {
    return categories.length <= item.categories.filter(category => categories.includes(category)).length
}

const checkDomains = (item, domainArr) => domainArr.includes(item.domainExtension)

const modifyDomainContainer = () => {
    let child = domainCards.lastElementChild;
    while (child) {
        domainCards.removeChild(child);
        child = domainCards.lastElementChild;
    }
    fillDomainContainer(mainData);
    notFoundBasedOnCondition();
}

const conditionsToFilter = () => {
    mainData = stableData.filter(item =>
        +symbolInputs[0].value < item.domainName.length
        && item.domainName.length < +symbolInputs[1].value
        && +rangeInputs[0].value < +(item.price.replace(' ', ''))
        && +(item.price.replace(' ', '')) < +rangeInputs[1].value.replace(' ', '')
        && checkCategories(item, checkedCategory)
    )
    if(checkedDomain.length !== 0){
        mainData = mainData.filter(item =>
            checkDomains(item, checkedDomain)
        )
    }
    if(searchInput.value){
        mainData = mainData.filter(item => item.domainName.includes(searchInput.value))
        searchInput.value = '';
    }
    modifyDomainContainer();
    document.querySelector('.domain-quantity').innerHTML = mainData.length
}


searchBtn.addEventListener('click', () => {
    conditionsToFilter();
    removeModal();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
})

/*json*/
try {
    async function getData() {
        const response = await fetch('../domainList_.json');
        const data = await response.json();
        return data;
    }

    getData().then(data => {

            stableData = data.domainList;
            mainData = data.domainList

            fillDomainContainer(data.domainList);

            data?.categories.forEach(item => {
                document.querySelector('.categories').insertAdjacentHTML("afterbegin", `
               <li class="flex gap-[15px] mb-[25px] items-center text-[#171D25] font-TKT-Regular">
                 <input class="category-checkbox flex pt-[2px] justify-center appearance-none border border-solid border-[#E5E5ED] h-[20px] w-[20px] rounded-[6px] cursor-pointer" id="${item.id}" type="checkbox" value="${item.name}">
                 <label class="pb-[4px]" for="${item.name}" >${item.name}</label>
               </li>
               
            `);
            });

            data?.domainList.forEach(item => {
                document.querySelector('.domain-name').insertAdjacentHTML("afterbegin", `
               <li class="flex gap-[15px] pb-[25px] items-center text-[#171D25] font-TKT-Regular">
                 <input class="domain-checkbox flex pt-[2px] justify-center appearance-none border border-solid border-[#E5E5ED] h-[20px] w-[20px] rounded-[6px] cursor-pointer"  type="checkbox" value="${item.domainExtension}">
                 <label class="pb-[4px]" for="${item.domainExtension}" >${item.domainExtension}</label>
               </li>
            `);
            });

            /*category checkboxes*/
            const categoryCheckbox = document.querySelectorAll('.category-checkbox');

            for (const checkbox of categoryCheckbox) {
                checkbox.addEventListener("click", function () {
                    if (this.checked && !checkedCategory.includes(this.value)) {
                        checkedCategory.push(+this.id);
                    } else {
                        checkedCategory = checkedCategory.filter(item => item !== +this.id);
                    }
                    ;
                });
            }
            ;

            /* domain checkbox */
            const domainCheckbox = document.querySelectorAll('.domain-checkbox');
            for (const domain of domainCheckbox) {
                domain.addEventListener("click", function () {
                    if (this.checked && !checkedDomain.includes(this.value)) {
                        checkedDomain.push(this.value);
                    } else {
                        checkedDomain = checkedDomain.filter(item => item !== this.value);
                    }
                })
            }
            ;
        }
    )
    ;

} catch
    (e) {
    console.log(e)
}


/*Range slider*/
const priceSlider = document.getElementById("price-slider")

noUiSlider.create(priceSlider, {
    start: [4500, 50000],
    connect: true,
    step: 1,
    range: {
        'min': [50],
        'max': [50000]
    }
});

const minPrice = document.getElementById("price-min"), maxPrice = document.getElementById("price-max");

const rangeInputs = [minPrice, maxPrice];

priceSlider.noUiSlider.on('update', (values, handle) => {
    rangeInputs[handle].value = Math.round(values[handle]);
})

const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    priceSlider.noUiSlider.set(arr)
};

rangeInputs.forEach((el, index) => {
    el.addEventListener('change', e => {
        setRangeSlider(index, e.currentTarget.value)
    })
});

/*Symbol slider*/
const symbolSlider = document.getElementById("symbol-slider")

noUiSlider.create(symbolSlider, {
    start: [7, 25],
    connect: true,
    step: 1,
    range: {
        'min': [1],
        'max': [30]
    }
});

const minSymbol = document.getElementById("symbol-min"), maxSymbol = document.getElementById("symbol-max");

const symbolInputs = [minSymbol, maxSymbol];

symbolSlider.noUiSlider.on('update', (values, handle) => {
    symbolInputs[handle].value = Math.round(values[handle]);
})

const setSymbolSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;
    symbolInputs.noUiSlider.set(arr)
};

symbolInputs.forEach((el, index) => {
    el.addEventListener('change', e => {
        setSymbolSlider(index, e.currentTarget.value)
    })
});

/*Sort with price*/
let sortLowHighControl = true;
const priceSortIcon = document.querySelector(".price-sort-icon");

document.getElementById("sortWithPrice").addEventListener("click", () => {
        if (sortLowHighControl) {
            [...domainCards.children].sort((a, b) => +a.children[1].children[0].children[0].children[0].innerHTML.replace(" ", '') - +b.children[1].children[0].children[0].children[0].innerHTML.replace(" ", ''))
                .forEach(node => domainCards.appendChild(node));
            sortLowHighControl = false;
            priceSortIcon.classList.remove("hidden")
            priceSortIcon.classList.add("-scale-x-100","rotate-180")

        } else {
            [...domainCards.children].sort((a, b) => +b.children[1].children[0].children[0].children[0].innerHTML.replace(" ", '') - +a.children[1].children[0].children[0].children[0].innerHTML.replace(" ", ''))
                .forEach(node => domainCards.appendChild(node));
            sortLowHighControl = true;
            priceSortIcon.classList.remove("rotate-180","-scale-x-100")
        }
});
/*Sort alphabetically*/
document.getElementById("alphabeticalSort").addEventListener("click", () => {
    [...domainCards.children].sort((a, b) => a.children[0].children[1].innerHTML.localeCompare(b.children[0].children[1].innerHTML))
        .forEach(node => domainCards.appendChild(node));
});

/*addToBasket*/
const itemsInBasket = [];
const uiBasket = document.getElementById("basket");
const notyf = new Notyf();

setTimeout(() => {
    [...domainCards.children].forEach((item, index) => {
        item.addEventListener('click', () => {
            if (!itemsInBasket.includes(item)) {
                itemsInBasket.push(item);
                uiBasket.innerHTML = String(itemsInBasket.length);
                uiBasket.classList.remove('hidden');
                item.children[1].children[1].classList.add('hidden');
                item.children[1].children[2].classList.remove('hidden');
                notyf.success('წარმატებით დაემატა!');
            } else {
                notyf.error('უკვე დამატებულია!');
            }
        })
    })
}, 500);


/*Search*/
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        removeModal();
        conditionsToFilter();
    }
});

document.getElementById("filter-btn").addEventListener("click", () => {
    document.querySelector(".shadow-control").classList.add("search-btn-container")
    document.getElementById("modal-filter-container").classList.add("pt-[10px]","absolute", "top-0", "bg-white", "left-0", "w-screen", "min-h-screen", "z-[100]","flex","justify-center");
    document.getElementById("filter").classList.add("always");
})

document.getElementById("close-modal").addEventListener("click", () => {
    removeModal()
})
