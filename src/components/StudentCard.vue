<template>
  <div class="student">
    <img :src="student.pic" alt="" />
    <div class="body">
      <h3 class="name">{{ name }}</h3>
      <p class="email">Email: {{ student.email }}</p>
      <p class="company">Company: {{ student.company }}</p>
      <p class="company">Skil: {{ student.skill }}</p>
      <p class="company">Average: {{ average }}%</p>
      <button>{{ tag }}</button>
      <br />
      <input class="input-tag" v-model="tag" placeholder="Add tag" />
      <div class="collapse" ref="collapse">
        <ul class="grades">
          <li v-for="(grade, i) in student.grades" :key="'grade' + i">
            Test {{ i + 1 }}: {{ grade }}%
          </li>
        </ul>
      </div>
    </div>
    <button @click="handleToggleClick" class="toggle">
      <span v-if="!expanded">+</span>
      <span v-else>-</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Student",
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    expanded: false,
    tag: "",
  }),
  mounted() {
    this.toggle();
  },
  methods: {
    handleToggleClick() {
      this.expanded = !this.expanded;
      this.toggle();
    },
    toggle() {
      const { collapse } = this.$refs;
      if (this.expanded) {
        collapse.style.height = `${collapse.scrollHeight}px`;
      } else {
        collapse.style.height = 0;
      }
    },
  },
  computed: {
    name() {
      return `${this.student.firstName} ${this.student.lastName}`;
    },
    average() {
      const total = this.student.grades.reduce((total, n) => total + +n, 0);
      return total / this.student.grades.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.student {
  display: flex;
  align-items: start;
  margin: 1rem 0;
  padding: 1rem 0;
  font-size: 12px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .name {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .email {
    margin-top: 3px;
  }
  .body {
    margin-left: 1rem;
    flex-grow: 1;

    p {
      padding-top: 4px;
    }

    .input-tag {
      border: 0px;
      border-bottom: 1px solid #ccc;
      padding-top: 10px;
    }
  }
  .toggle {
    padding: 0.3rem 0.5rem;
    border: 0;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .grades {
    padding: 1rem 0;
    li {
      padding: 0.2rem 0;
    }
  }
  .collapse {
    transition: all 0.2s ease-in-out;
    overflow: hidden;
  }
}
</style>
