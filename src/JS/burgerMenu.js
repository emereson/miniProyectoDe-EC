const homeNav = document.querySelector('.home__nav')
const homeGrid = document.querySelector('.bxs-grid-alt')
const contentProfile = document.querySelector('.profile__content')
const user = document.querySelector('.bxs-user')
const contenCar = document.querySelector('.contentCar')
const iconCar = document.querySelector('.bxs-cart-add')

homeGrid.addEventListener('click',function()
{
    if(homeGrid.classList.toggle('bxs-x-circle')){
    homeNav.style.display='block'}
    else{
        homeNav.style.display='none'
    }
})
user.addEventListener('click',function()
{
    if(contentProfile.classList.toggle('bxs-user')){
        contentProfile.style.display='none'}
        else{
            contentProfile.style.display='block'
        }
})

iconCar.addEventListener('click', function () 
{
    contenCar.classList.toggle('contentCar__show')
})