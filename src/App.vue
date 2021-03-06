<template>
  <div class="container">
    <h2>Students</h2>
    <input
      class="filter-input"
      v-model="query"
      type="text"
      placeholder="Search by name"
    />
    <input
      class="tag-filter"
      v-model="tagquery"
      type="text"
      placeholder="Search by tag"
    />
    <div v-for="student in query ? filtered : students" :key="student.id">
      <StudentCard :student="student" style="border-bottom: 1px solid #ccc" />
    </div>
  </div>
</template>

<script>
import StudentCard from "./components/StudentCard.vue";
export default {
  name: "App",
  components: { StudentCard },
  data: () => ({
    students: [],
    filtered: [],
    loading: false,
    query: "",
    tagquery: "",
  }),
  created() {
    this.getStudents();
  },
  methods: {
    async getStudents() {
      this.loading = true;
      try {
        const { data } = await this.$http.get(`/assessment/students`);
        this.students = data.students;
        console.log(this.students);
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    filter() {},
  },
  watch: {
    query(value) {
      if (value) {
        this.filtered = this.students.filter((student) => {
          return `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      } else {
        this.filtered = [];
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Varela&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Varela", sans-serif;
  outline: none;
}
body {
  background: #f8f8f8;
  padding: 0 2rem;
}
.container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.filter-input {
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.8rem 0;
  background: none;
  margin: 20px 0 10px;
  width: 100%;
  transition: all 0.1s ease-in-out;
  &:focus,
  &.active {
    border-bottom: 2px solid royalblue;
  }
}
.tag-filter {
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.8rem 0;
  background: none;
  margin: 0px 0 10px;
  width: 100%;
  transition: all 0.1s ease-in-out;
  &:focus,
  &.active {
    border-bottom: 2px solid royalblue;
  }
}
</style>
