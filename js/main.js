// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).
// Элементы базы данных
let surname = document.getElementById('surname');
let name = document.getElementById('name');
let middleName = document.getElementById('middleName');
let birthday = document.getElementById('birthday');
let year = document.getElementById('year');
let faculty = document.getElementById('faculty');
let tableBase = document.getElementById('tableBase');
// Элементы добавления студента
let inputSurname = document.getElementById('inputSurmane');
let inputName = document.getElementById('inputName');
let inputMiddleName = document.getElementById('inputMiddleName');
let inputBirthday = document.getElementById('inputBirthday');
let inputYear = document.getElementById('inputYear');
let inputFaculty = document.getElementById('inputFaculty');
let inputBtn = document.getElementById('inputBtn');
// Элементы фильтра студентов
let surnameFilter = document.getElementById('surnameFilter');
let nameFilter = document.getElementById('nameFilter');
let middleNameFilter = document.getElementById('inputSurmane');
let dateFilter = document.getElementById('dateFilter');
let yearFilter = document.getElementById('yearFilter');
let facultyFilter = document.getElementById('facultyFilter');
// Кнопки сортировки
let surnameSort = document.getElementById('btnSortSurname');
let nameSort = document.getElementById('btnSortName');
let middleNameSort = document.getElementById('btnSortMiddleName');
let birthdaySort = document.getElementById('btnSortBirthday');
let yearSort = document.getElementById('btnSortYear');
let facultySort = document.getElementById('btnSortFaculty');


// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
const studentsList = [
  // Добавьте сюда объекты студентов
  {
    surname: 'Иванов',
    name: 'Иван',
    middleName: 'Иванович',
    birthday: `01.02.2003`,
    year: `01.09.2019`,
    faculty: 'IT'
  },

  {
    surname: 'Петров',
    name: 'Иван',
    middleName: 'Иванович',
    birthday: `30.11.1997`,
    year: `01.09.2020`,
    faculty: 'IT'
  },

]

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.
function getStudentItem() {
  studentObj = {};
  studentObj.surname = inputSurname.value;
  studentObj.name = inputName.value;
  studentObj.middleName = inputMiddleName.value;
  studentObj.birthday = inputBirthday.valueAsDate;
  studentObj.year = inputYear.value;
  studentObj.faculty = inputFaculty.value;

  studentsList.push(studentObj);
}


// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

// Функция очистки базы
function deleteChild() {
  let childNodes = tableBase.querySelectorAll('.tr-student')

  for (let i = 0, j = childNodes.length; i < j; i++) {
    let childNode = childNodes[i]
    tableBase.removeChild(childNode)
  }
}

// Функция рендера
function renderStudentsTable(studentsArray) {
  for (obj of studentsArray) {
    let tr = document.createElement('tr');
    let surname = document.createElement('td');
    let name = document.createElement('td');
    let middleName = document.createElement('td');
    let birthday = document.createElement('td');
    let year = document.createElement('td');
    let faculty = document.createElement('td');
    let btnDelete = document.createElement('btn');

    tr.classList.add('tr-student');
    surname.classList.add('table__text');
    name.classList.add('table__text');
    middleName.classList.add('table__text');
    birthday.classList.add('table__text');
    year.classList.add('table__text');
    faculty.classList.add('table__text');

    surname.textContent = obj.surname;
    name.textContent = obj.name;
    middleName.textContent = obj.middleName;
    birthday.textContent = obj.birthday + ` ` + `Полных лет: ${age(obj.birthday)}`;
    year.textContent = titleLearn(obj.year);
    faculty.textContent = obj.faculty;

    tableBase.append(tr);
    tr.append(surname, name, middleName, birthday, year, faculty);
  }
}

// Функция высчитывания возраста
function age(str) {
  let [date, month, year] = str.match(/(\d+)/g);
  --month;
  let now = new Date;
  let nowYear = now.getFullYear(),
    nowMonth = now.getMonth(),
    nowDate = now.getDate();
  return nowYear - year - (0 > (nowMonth - month || nowDate - date))
};

// Функция высчитывания года обучения
function titleLearn(str) {
  let [date, month, year] = str.match(/(\d+)/g);
  --month;
  let now = new Date;
  let nowYear = now.getFullYear(),
    nowMonth = now.getMonth(),
    nowDate = now.getDate();
  let rate = nowYear - year - (0 > (nowMonth - 9 || nowDate - 1))
  rate = ++rate > 4 ? 'закончил' : `${rate} курс`
  let range = `${year} - ${+year + 4} (${rate})`;
  return range;
}

renderStudentsTable(studentsList);

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
inputBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (!inputSurname.value.trim() || !inputName.value.trim() || !inputMiddleName.value.trim() || !inputBirthday.value.trim() || !inputYear.value.trim() || !inputFaculty.value.trim()) {
    alert('Вы ввели не все данные')
  } else {
    getStudentItem();
    deleteChild();
    renderStudentsTable(studentsList);
  }
})

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
function sortArray(criteria) {

}

surnameSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortArray(surnameSort);
})

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.





